export interface IToken {
  name: string,
  shortName: string,
  image: string,
}

export interface ITokenDetail extends IToken {
  price: number,
  priceChange: number,
  volume: number,
  liquidity: number
}