import { IPool, IPoolDetail } from 'models';
import { mockTokens } from './swap.mock';

export const mockPool: IPool = {
  token1: mockTokens[0],
  token2: mockTokens[1],
  token1Amount: 1862,
  token2Amount: 0.045,
  share: 0.085,
};

export const mockPools: IPool[] = [
  mockPool,
];

export const mockPoolDetails: IPoolDetail[] = [
  {
    token1: mockTokens[0],
    token2: mockTokens[1],
    tvl: 12.2,
    volume: 6.06,
    fees: 1.5,
    APY: 3.24,
    share: 0.3
  },
  {
    token1: mockTokens[2],
    token2: mockTokens[3],
    tvl: 15.6,
    volume: 2.3,
    fees: 2.9,
    APY: 11.24,
    share: 0.3
  },
  {
    token1: mockTokens[2],
    token2: mockTokens[4],
    tvl: 3.4,
    volume: 4.1,
    fees: 1.1,
    APY: 5.67,
    share: 0.05
  },
  {
    token1: mockTokens[0],
    token2: mockTokens[3],
    tvl: 7.8,
    volume: 1.7,
    fees: 4.4,
    APY: 6.23,
    share: 0.05
  },
  {
    token1: mockTokens[3],
    token2: mockTokens[4],
    tvl: 16.8,
    volume: 2.1,
    fees: 3.5,
    APY: 5.44,
    share: 0.3
  },
  {
    token1: mockTokens[1],
    token2: mockTokens[3],
    tvl: 13.22,
    volume: 4.06,
    fees: 3.55,
    APY: 13.24,
    share: 0.3
  },
  {
    token1: mockTokens[0],
    token2: mockTokens[2],
    tvl: 9.22,
    volume: 2.6,
    fees: 4.65,
    APY: 3.15,
    share: 0.3
  },
  {
    token1: mockTokens[4],
    token2: mockTokens[5],
    tvl: 20.2,
    volume: 3.06,
    fees: 3.45,
    APY: 3.24,
    share: 0.05
  },
  {
    token1: mockTokens[1],
    token2: mockTokens[4],
    tvl: 1.2,
    volume: 3.06,
    fees: 7.5,
    APY: 3.54,
    share: 0.05
  },
  {
    token1: mockTokens[2],
    token2: mockTokens[5],
    tvl: 15.2,
    volume: 8.96,
    fees: 9.5,
    APY: 3.24,
    share: 0.3
  }
];

function generatePriceChange() {
  const basePrice = 100; // Starting price
  const volatility = 0.2; // Degree of price fluctuation

  // Generate a random percentage change between -volatility and +volatility
  const percentChange = (Math.random() * 2 * volatility) - volatility;

  // Calculate the new price by applying the percentage change to the base price
  const newPrice = basePrice * (1 + percentChange);
  return newPrice;
}

export const createMockChartInfo = (): {
  time: Date,
  price: number,
}[] => {
  let array: {
    time: Date,
    price: number,
  }[] = [];

  const currentTime = new Date().getTime();
  let startTime = currentTime - 1000 * 60 * 60 * 24 * 30 * 365;

  while (startTime < currentTime) {
    const period = Math.random() * 1000 * 60 * 60 * 4;
    const price = generatePriceChange();
    array.push({
      time: new Date(startTime += period),
      price,
    });
  }

  return array;
}