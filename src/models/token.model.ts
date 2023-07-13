export interface IToken {
  name: string,
  symbol: string,
  image: string,
}

export interface ITokenDetail extends IToken {
  price: number,
  priceChange: number,
  volume: number,
  liquidity: number
}

export type ConversionRates = {
  [baseCurrency: string]: {
    [targetCurrency: string]: number;
  };
};