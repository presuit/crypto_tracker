import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowCircleLeft,
  faCheck,
  faLink,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, useMotionValue, Variants } from "framer-motion";
import { useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { Link, useMatch, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  getCoinDetail,
  getCoinSYMBOL,
  getHistoricalOHLC,
  getOHLCForLastFullDay,
} from "../api";
import { ICoinDetail, ICoinPrice } from "../atom";
import Chart from "react-apexcharts";

const ContainerVar: Variants = {
  initial: {
    opacity: 0,
    x: 30,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delayChildren: 0.5,
    },
  },
};

const ColumnWrapperVar: Variants = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: -20,
    y: -20,
    transition: {
      duration: 0.5,
    },
  },
};

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 6rem;
`;

const CoinContainer = styled(motion.div)`
  max-width: 1024px;
  width: 100%;
  height: 70vh;
  position: relative;
`;

const Column = styled(motion.div)`
  width: 60%;
  height: 100%;
  display: flex;
  padding: 2rem;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
  overflow: hidden;
  position: relative;
  &:first-child {
    width: 40%;
    justify-content: center;
    background-color: ${(props) => props.theme.accentGray};
  }
`;

const CoinBackButton = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 2rem;
`;

const CoinBackButtonLink = styled(Link)`
  font-size: 3rem;
  color: ${(props) => props.theme.bgColor};
  transition: all 0.3s linear;
  &:hover {
    color: ${(props) => props.theme.redColor};
  }
`;

const CoinName = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
`;

const CoinSymbol = styled(motion.img)`
  max-width: 100%;
  max-height: 100%;
  width: 50%;
  object-fit: contain;
  object-position: center center;
  margin-bottom: 1.25rem;
  border-radius: 9999px;
`;

const ContainerShadow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.blueColor};
  border-radius: 2rem;
`;

const ColumnWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${(props) => props.theme.textWrapperColor};
  border-radius: 2rem;
  overflow: hidden;
  display: flex;
`;

const CoinContentWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;
  padding-top: 6rem;
`;

const CoinContentContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
`;

const CoinContent = styled(motion.div)`
  width: 100%;
  height: 10rem;
  background-color: ${(props) => props.theme.headerBgColor};
  border-radius: 2rem;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  overflow: hidden;
  place-self: center;
`;

const CoinContentTitle = styled.h1`
  font-weight: 600;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.blueColor};
  font-size: 1.25rem;
  text-transform: capitalize;
  color: ${(props) => props.theme.textColor};
`;

const CoinContentText = styled.h2`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.textColor};
  padding-left: 0.7rem;
  padding-right: 0.7rem;
  text-align: center;
`;

const CoinContentLink = styled.a`
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.textColor};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`;

const CoinNav = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-radius: 2rem;
  overflow: hidden;
`;

const CoinNavLink = styled(Link)`
  width: 100%;
  text-decoration: none;
  &:nth-child(2) {
    border-left: 1px solid ${(props) => props.theme.textWrapperColor};
    border-right: 1px solid ${(props) => props.theme.textWrapperColor};
  }
`;

const CoinNavLinkText = styled(motion.div)<{ selected: boolean }>`
  width: 100%;
  padding: 1.5rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) =>
    props.selected ? props.theme.accentBlue : props.theme.headerBgColor};
`;

const CoinChartWrapper = styled.div`
  width: 100%;
  height: 100%;
  grid-column: 1 / span 3;
`;

const scrollOffset = 100;

const CoinContentWrapperVar: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.5,
      delayChildren: 0.2,
      staggerChildren: 0.2,
    },
  },
};

const CoinContentVar: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Detail() {
  const columnRef = useRef<HTMLDivElement>(null);
  const columnWrapperRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const priceTab = useMatch("/:coinId/price");
  const chartTab = useMatch("/:coinId/chart");
  const infoTab = useMatch("/:coinId");
  const scrollY = useMotionValue(0);
  const { isLoading: coinLoading, data: coinData } = useQuery<ICoinDetail>(
    ["coinDetail", params.coinId],
    getCoinDetail
  );
  const { isLoading: priceLoading, data: priceData } = useQuery<ICoinPrice[]>(
    ["coinDetail", params.coinId, "price"],
    getOHLCForLastFullDay
  );
  const { isLoading: chartLoading, data: chartData } = useQuery<ICoinPrice[]>(
    ["coinDetail", params.coinId, "chart"],
    getHistoricalOHLC
  );

  const handleWheel = (e: WheelEvent) => {
    if (columnRef.current && columnWrapperRef.current) {
      const scrollYConstraint =
        columnRef.current.scrollHeight -
        columnWrapperRef.current.offsetHeight +
        scrollOffset / 2;

      let offset = 0;
      if (e.deltaY > 0) {
        if (scrollYConstraint < 0) return;
        console.log("scroll down!");
        offset =
          scrollY.get() - scrollOffset < -scrollYConstraint
            ? -scrollYConstraint
            : scrollY.get() - scrollOffset;
      } else {
        console.log("scrollUp!");
        offset =
          scrollY.get() + scrollOffset > 0 ? 0 : scrollY.get() + scrollOffset;
      }
      scrollY.set(offset);
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", handleWheel);
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const loading = coinLoading || priceLoading || chartLoading;

  return (
    <Wrapper>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <CoinContainer
          variants={ContainerVar}
          initial="initial"
          animate="animate"
        >
          <ContainerShadow />
          <ColumnWrapper variants={ColumnWrapperVar}>
            <Column>
              <CoinBackButton>
                <CoinBackButtonLink to={"/"}>
                  <FontAwesomeIcon icon={faArrowCircleLeft} />
                </CoinBackButtonLink>
              </CoinBackButton>
              <CoinSymbol
                animate={{ rotateY: "360deg" }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  repeatDelay: 3,
                  delay: 1,
                }}
                src={getCoinSYMBOL(coinData?.symbol.toLowerCase() || "")}
              />
              <CoinName>{coinData?.name}</CoinName>
            </Column>
            <Column ref={columnWrapperRef}>
              <CoinContentWrapper style={{ y: scrollY }} ref={columnRef}>
                <CoinNav>
                  <CoinNavLink to={`/${params.coinId}`}>
                    <CoinNavLinkText selected={Boolean(infoTab)}>
                      Info
                    </CoinNavLinkText>
                  </CoinNavLink>
                  <CoinNavLink to={`/${params.coinId}/price`}>
                    <CoinNavLinkText selected={Boolean(priceTab)}>
                      Price
                    </CoinNavLinkText>
                  </CoinNavLink>
                  <CoinNavLink to={`/${params.coinId}/chart`}>
                    <CoinNavLinkText selected={Boolean(chartTab)}>
                      Chart
                    </CoinNavLinkText>
                  </CoinNavLink>
                </CoinNav>
                {Boolean(infoTab) && (
                  <CoinContentContainer
                    variants={CoinContentWrapperVar}
                    initial="hidden"
                    animate="visible"
                  >
                    <CoinContent variants={CoinContentVar}>
                      <CoinContentTitle>Symbol</CoinContentTitle>
                      <CoinContentText>{coinData?.symbol}</CoinContentText>
                    </CoinContent>
                    <CoinContent variants={CoinContentVar}>
                      <CoinContentTitle>Rank</CoinContentTitle>
                      <CoinContentText>{coinData?.rank}</CoinContentText>
                    </CoinContent>
                    <CoinContent variants={CoinContentVar}>
                      <CoinContentTitle>WebSite</CoinContentTitle>
                      <CoinContentText>
                        {coinData?.links.website ? (
                          <CoinContentLink
                            href={coinData?.links.website || ""}
                            target={"_blank"}
                          >
                            <FontAwesomeIcon icon={faLink} />
                          </CoinContentLink>
                        ) : (
                          <CoinContentText>
                            <FontAwesomeIcon icon={faTimes} />
                          </CoinContentText>
                        )}
                      </CoinContentText>
                    </CoinContent>
                    <CoinContent variants={CoinContentVar}>
                      <CoinContentTitle>Open Source</CoinContentTitle>
                      <CoinContentLink>
                        {coinData?.open_source ? (
                          <FontAwesomeIcon icon={faCheck} />
                        ) : (
                          <FontAwesomeIcon icon={faTimes} />
                        )}
                      </CoinContentLink>
                    </CoinContent>
                    <CoinContent variants={CoinContentVar}>
                      <CoinContentTitle>Proof Type</CoinContentTitle>
                      <CoinContentText>
                        {coinData?.proof_type.slice(0, 30)}...
                      </CoinContentText>
                    </CoinContent>
                    <CoinContent variants={CoinContentVar}>
                      <CoinContentTitle>Github</CoinContentTitle>
                      {coinData?.links.source_code ? (
                        <CoinContentLink
                          href={coinData?.links.source_code || ""}
                          target={"_blank"}
                        >
                          <FontAwesomeIcon icon={faGithub} />
                        </CoinContentLink>
                      ) : (
                        <CoinContentLink>
                          <FontAwesomeIcon icon={faTimes} />
                        </CoinContentLink>
                      )}
                    </CoinContent>
                  </CoinContentContainer>
                )}
                {Boolean(priceTab) &&
                  Array.isArray(priceData) &&
                  priceData.length > 0 && (
                    <CoinContentContainer
                      variants={CoinContentWrapperVar}
                      initial="hidden"
                      animate="visible"
                    >
                      <CoinContent variants={CoinContentVar}>
                        <CoinContentTitle>Open</CoinContentTitle>
                        <CoinContentText>
                          {Math.floor(priceData[0].open)}
                        </CoinContentText>
                      </CoinContent>
                      <CoinContent variants={CoinContentVar}>
                        <CoinContentTitle>Close</CoinContentTitle>
                        <CoinContentText>
                          {Math.floor(priceData[0].close)}
                        </CoinContentText>
                      </CoinContent>
                      <CoinContent variants={CoinContentVar}>
                        <CoinContentTitle>High</CoinContentTitle>
                        <CoinContentText>
                          {Math.floor(priceData[0].high)}
                        </CoinContentText>
                      </CoinContent>
                      <CoinContent variants={CoinContentVar}>
                        <CoinContentTitle>Low</CoinContentTitle>
                        <CoinContentText>
                          {Math.floor(priceData[0].low)}
                        </CoinContentText>
                      </CoinContent>
                      <CoinContent variants={CoinContentVar}>
                        <CoinContentTitle>Volume</CoinContentTitle>
                        <CoinContentText>{priceData[0].volume}</CoinContentText>
                      </CoinContent>
                      <CoinContent variants={CoinContentVar}>
                        <CoinContentTitle>Market Cap</CoinContentTitle>
                        <CoinContentText>
                          {priceData[0].market_cap}
                        </CoinContentText>
                      </CoinContent>
                    </CoinContentContainer>
                  )}
                {Boolean(chartTab) && chartData && (
                  <>
                    <CoinChartWrapper>
                      <Chart
                        series={[
                          {
                            data: chartData.map((data) => {
                              return {
                                x: new Date(data.time_close),
                                y: [data.open, data.high, data.low, data.close],
                              };
                            }),
                          },
                        ]}
                        type="candlestick"
                        options={{
                          chart: {
                            toolbar: {
                              show: false,
                            },
                          },
                          grid: { show: false },
                          stroke: {
                            curve: "smooth",
                            width: 5,
                          },
                          title: { text: "30 Days" },
                          xaxis: {
                            type: "datetime",
                          },
                          yaxis: {
                            show: false,
                          },
                        }}
                      />
                    </CoinChartWrapper>
                  </>
                )}
              </CoinContentWrapper>
            </Column>
          </ColumnWrapper>
        </CoinContainer>
      )}
    </Wrapper>
  );
}
