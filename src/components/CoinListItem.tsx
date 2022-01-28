import { ICoins } from "../atom";
import styled from "styled-components";
import { getCoinSYMBOL } from "../api";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
  &:nth-child(3n + 1),
  :nth-child(3n + 3) {
    background-color: ${(props) => props.theme.textWrapperColor};
    color: ${(props) => props.theme.redColor};
  }
`;

const CoinSymbolImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  object-position: center center;
  width: 50%;
  border-radius: 9999px;
`;

const CoinName = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
`;

const Rank = styled.h1`
  font-size: 3rem;
  font-weight: 600;
  color: ${(props) => props.theme.blueColor};
`;

const Href = styled(Link)`
  width: 100%;
  height: 100%;
  text-decoration: none;
`;

export default function CoinListItem(coin: ICoins) {
  return (
    <Href to={`/${coin.id}`} state={{ coin }}>
      <Wrapper>
        <CoinSymbolImage src={getCoinSYMBOL(coin.symbol.toLowerCase())} />
        <Rank>{coin.rank}</Rank>
        <CoinName>{coin.name}</CoinName>
      </Wrapper>
    </Href>
  );
}
