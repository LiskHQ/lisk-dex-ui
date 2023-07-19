export interface DenomUnit {
  denom: string,
  decimals: number,
  aliases: string[]
}
export interface IToken {
  chainID: string,
  chainName: string,
  tokenName: string,
  tokenID: string,
  networkType?: string,
  description?: string,
  logo: {
    png: string,
    svg: string,
  },
  symbol: string,
  displayDenom?: string,
  baseDenom?: string,
  denomUnits?: DenomUnit[],
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

export interface ISwapData {
  tokenIn: IToken,
  tokenOut: IToken,
  amountIn: number,
  minAmountOut: number,
}