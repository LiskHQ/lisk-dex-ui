import { ThemeType } from 'consts';

export interface IFiatCurrency {
  name: string,
  shortName: string,
  image: any,
}

export interface ISettings {
  splipageTolerance: number,
  transactionDeadline: number,
  theme: ThemeType,
  currency: string,
}
