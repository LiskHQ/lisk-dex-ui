import { IToken } from './token.model';

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

export interface ICreatePool {
  token1: IToken,
  token2: IToken,
  feeTier: number,
  tickInitialPrice: number,
  tickLower: number,
  tickUpper: number,
  token1Amount: number,
  token2Amount: number,
}

export interface IPoolDetail {
  token1: IToken,
  token2: IToken,
  tvl: number,
  volume: number,
  fees: number,
  share: number,
  APY: number,
}