import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { Link, useMatch } from "react-router-dom";
import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";
import { useRecoilState, useRecoilValue } from "recoil";
import { isDarkState } from "../atom";

const Wrapper = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.headerBgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  z-index: 10;
  position: absolute;
`;

const CoinSymbolWrapper = styled.div<{ fixedColor: boolean }>`
  padding: 1.25rem;
  padding-left: 3rem;
  padding-right: 3rem;
  background-color: ${(props) =>
    props.fixedColor ? props.theme.bgColor : props.theme.textWrapperColor};
  transform: skew(-12deg);
`;

const CoinSymbol = styled(FontAwesomeIcon)`
  color: ${(props) => props.theme.textColor};
  font-size: 2rem;
  transform: skew(12deg);
`;

const ColorThemeButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
  right: 0;
  margin-right: 1.5rem;
  width: 3rem;
  height: 1.5rem;
`;

const ColorThemeButton = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 9999px;
  background-color: ${(props) => props.theme.bgColor};
`;

const ColorThemeButtonSymbol = styled.div<{ direction: "left" | "right" }>`
  position: absolute;
  top: 0;
  margin-top: 3px;
  color: ${(props) => props.theme.textColor};
  ${(props) => (props.direction === "left" ? "left: -20px" : "right: -20px")};
`;

const ColorThemeButtonItem = styled(motion.div)<{ isDark: boolean }>`
  width: 1rem;
  height: 1rem;
  padding: 10px;
  border-radius: 9999px;
  background-color: ${(props) => props.theme.textWrapperColor};
  align-self: ${(props) => (props.isDark ? "flex-end" : "flex-start")};
`;

export default function Header() {
  const coinsMatch = useMatch("/");
  const coinDetailMatch = useMatch("/:coinId/*");
  const [isDark, setIsDark] = useRecoilState(isDarkState);
  return (
    <Wrapper>
      <Link to={"/"}>
        <CoinSymbolWrapper fixedColor={Boolean(coinsMatch)}>
          <CoinSymbol icon={faCoins} />
        </CoinSymbolWrapper>
      </Link>
      <CoinSymbolWrapper fixedColor={Boolean(coinDetailMatch)}>
        <CoinSymbol icon={faBitcoin} />
      </CoinSymbolWrapper>
      <ColorThemeButtonWrapper>
        <ColorThemeButton onClick={() => setIsDark((prev) => !prev)}>
          <ColorThemeButtonItem isDark={isDark} layout></ColorThemeButtonItem>
        </ColorThemeButton>
        <ColorThemeButtonSymbol direction="left">
          <FontAwesomeIcon icon={faSun} />
        </ColorThemeButtonSymbol>
        <ColorThemeButtonSymbol direction="right">
          <FontAwesomeIcon icon={faMoon} />
        </ColorThemeButtonSymbol>
      </ColorThemeButtonWrapper>
    </Wrapper>
  );
}
