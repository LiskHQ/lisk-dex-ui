import { IFilteredTokens, ITokenBalance, ITokenDetail } from './token.model';

export interface IResponse {
  data: unknown,
  meta: unknown,
  links: unknown,
}

export interface ITopTokensFromDatabaseRequest {
  tokenID?: string,
}

export interface ITopTokensFromDatabaseReponse extends IResponse {
  data: {
    topTokensFromDatabase: ITokenDetail[] | IFilteredTokens[]
  }
}

export interface ITokenBalancesRequest {
  limit?: number,
  address: string,
}

export interface ITokenBalancesReponse extends IResponse {
  data: ITokenBalance[],
  meta: {
    address: string,
    count: number,
    offset: number,
    total: number,
  }
}