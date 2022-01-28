import { atom } from "recoil";

export interface ICoins {
  id: string;
  is_active: boolean;
  is_new: boolean;
  name: string;
  rank: number;
  symbol: string;
  type: string;
}

type ICoinLinks = {
  [key: string]: string;
};

export interface ICoinDetail {
  id: "string";
  name: "string";
  symbol: "string";
  rank: "number";
  is_new: "boolean";
  is_active: "boolean";
  type: "string";
  tags: "object";
  team: "object";
  description: "string";
  message: "string";
  open_source: "boolean";
  started_at: "string";
  development_status: "string";
  hardware_wallet: "boolean";
  proof_type: "string";
  org_structure: "string";
  hash_algorithm: "string";
  links: ICoinLinks;
  links_extended: "object";
  whitepaper: "object";
  first_data_at: "string";
  last_data_at: "string";
}

export interface ICoinPrice {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

export const isDarkState = atom({
  key: "isDarkState",
  default: true,
});
