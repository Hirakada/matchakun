import { MatchaBase, MatchaPowder } from "@/data/matchaMenu";

export type CartItem = {
  powder: MatchaPowder["id"];
  base: MatchaBase["id"];
  qty: number;
};

export type CustomerInfo = {
  name: string;
  notes: string;
};

export type MobileStep =
  | "menu"
  | "checkout";