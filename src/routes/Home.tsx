import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getCoins } from "../api";
import { ICoins } from "../atom";
import { motion, AnimatePresence, Variants } from "framer-motion";
import CoinListItem from "../components/CoinListItem";
import { useEffect, useState } from "react";

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
  padding-top: 4rem;
`;

const CoinsContainer = styled(motion.div)`
  max-width: 1024px;
  width: 100%;
  height: 50vh;
  background-color: ${(props) => props.theme.textWrapperColor};
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  /* overflow: hidden; */
  position: relative;
`;

const CoinContainerShadow = styled(motion.div)`
  position: absolute;
  background-color: ${(props) => props.theme.blueColor};
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 2rem;
`;

const CoinListSliderWrapper = styled(motion.div)`
  width: 100%;
  background-color: ${(props) => props.theme.bgColor};
  height: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 2rem;
`;

const CoinListSliderButton = styled.button<{ direction: "left" | "right" }>`
  width: 8%;
  height: 100%;
  position: absolute;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  border: 0px;
  opacity: 0.1;
  ${(props) => (props.direction === "left" ? "left: 0;" : "right: 0;")}
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

const CoinListSliderButtonSymbol = styled(FontAwesomeIcon)`
  font-size: 2rem;
  color: ${(props) => props.theme.textColor};
`;

const CoinSlider = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  position: absolute;
`;

const dataOffset = 3;

type SlideDirection = "left" | "right";

const sliderVar: Variants = {
  hidden: (direction: SlideDirection) => ({
    opacity: 0,
    x: direction === "right" ? window.outerWidth : -window.outerWidth,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "tween", duration: 0.3 },
  },
  exit: (direction: SlideDirection) => ({
    opacity: 0,
    x: direction === "right" ? -window.outerWidth : window.outerWidth,
    transition: { type: "tween", duration: 0.3 },
  }),
};

const shadowVar: Variants = {
  hidden: {
    x: 0,
    y: 0,
  },
  visible: {
    x: -20,
    y: -20,
    transition: { type: "spring", duration: 0.7 },
  },
};

const containerVar: Variants = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delayChildren: 0.5 },
  },
};

export default function Home() {
  const { isLoading, data } = useQuery<ICoins[]>("coins", getCoins);
  const [index, setIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<SlideDirection>("right");
  const [leaving, setLeaving] = useState(false);

  const handleSlideMove = (direction: SlideDirection) => {
    if (data) {
      if (leaving) return;
      setLeaving(true);

      const maxIndex = Math.ceil(data.length / dataOffset);

      switch (direction) {
        case "left":
          // go back
          setSlideDirection("left");
          setIndex((prev) => (prev === 0 ? maxIndex - 1 : prev - 1));
          break;
        case "right":
          //  go futher
          setSlideDirection("right");
          setIndex((prev) => (prev === maxIndex - 1 ? 0 : prev + 1));
          break;
      }
    }
  };

  const handleLeaving = () => setLeaving((prev) => !prev);

  return (
    <Wrapper>
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        // 전체 껍딱
        <CoinsContainer
          initial="hidden"
          animate="visible"
          variants={containerVar}
        >
          <CoinContainerShadow />
          {/* 슬라이더 껍딱 */}
          <CoinListSliderWrapper variants={shadowVar}>
            {/* 슬라이더 내부에 있는 아이템들 껍딱  */}
            <AnimatePresence
              initial={false}
              custom={slideDirection}
              onExitComplete={handleLeaving}
            >
              <CoinSlider
                custom={slideDirection}
                variants={sliderVar}
                initial="hidden"
                animate="visible"
                exit="exit"
                key={index}
              >
                {data
                  ?.slice(index * dataOffset, index * dataOffset + dataOffset)
                  .map((coin) => {
                    return <CoinListItem key={coin.id} {...coin} />;
                  })}
              </CoinSlider>
            </AnimatePresence>
            {/* 슬라이더 움직이는 버튼들 */}
            <CoinListSliderButton
              onClick={() => handleSlideMove("left")}
              direction="left"
            >
              <CoinListSliderButtonSymbol icon={faArrowLeft} />
            </CoinListSliderButton>
            <CoinListSliderButton
              onClick={() => handleSlideMove("right")}
              direction="right"
            >
              <CoinListSliderButtonSymbol icon={faArrowRight} />
            </CoinListSliderButton>
          </CoinListSliderWrapper>
        </CoinsContainer>
      )}
    </Wrapper>
  );
}
