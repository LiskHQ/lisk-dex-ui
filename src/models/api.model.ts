import { IFilteredTokens, ITokenDetail } from './token.model';

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