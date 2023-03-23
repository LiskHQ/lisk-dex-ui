export interface LiquidityListInterface {
  token1Id: string;
  token2Id: string;
  feeTier: string;
  pooledtoken1: string;
  pooledtoken2: string;
  poolTokens: string;
  poolShare: string;
  accumulatedFeesToken1: string;
  accumulatedFeesToken2: string;
  totalFees: string;
}

export interface IpriceRange {
  minPrice: string,
  maxPrice: string,
  currentPrice: string  
}

export  interface IdepositAmounts {
  token1: string,
  token2: string,
  amount1: string,
  amount2: string,
  feeTier: string,
}
