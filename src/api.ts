const BASE_URL = "https://api.coinpaprika.com/v1";
export const COIN_SYMBOL_URL = "https://cryptoicon-api.vercel.app/api/icon/";

export const getCoins = async () => {
  return fetch(`${BASE_URL}/coins`).then((res) => res.json());
};

export const getCoinDetail = async ({ queryKey }: any) => {
  return fetch(`${BASE_URL}/coins/${queryKey[1]}`).then((res) => res.json());
};

export const getCoinSYMBOL = (symbol: string) => `${COIN_SYMBOL_URL}/${symbol}`;

export const getOHLCForLastFullDay = async ({ queryKey }: any) => {
  return fetch(`${BASE_URL}/coins/${queryKey[1]}/ohlcv/latest`).then((res) =>
    res.json()
  );
};

export const getHistoricalOHLC = async ({ queryKey }: any) => {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 30;
  return fetch(
    `${BASE_URL}/coins/${queryKey[1]}/ohlcv/historical?start=${startDate}&end=${endDate}`
  ).then((res) => res.json());
};
