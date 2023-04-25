import { IToken } from "./token.model";

export interface IPoolItem {
  id: string,
  token1: string,
  token2: string,
  rate: number,
  amount: number,
}

export interface IPool {
  id: string,
  token1: IToken,
  token2: IToken,
  token1Amount: number,
  token2Amount: number,
  share: number,
}