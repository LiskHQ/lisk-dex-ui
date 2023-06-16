import { tokenSvgs } from 'imgs/icons';
import { IToken, ITokenDetail } from 'models';

export const mockBalance = 4521.425;

export const mockTokens: IToken[] = [
  {
    shortName: 'LSK',
    name: 'Lisk',
    image: tokenSvgs.LSK,
  },
  {
    shortName: 'ETH',
    name: 'Ethereum',
    image: tokenSvgs.ETH,
  },
  {
    shortName: 'DEU',
    name: 'DEU',
    image: tokenSvgs.DEU,
  },
  {
    shortName: 'FAE',
    name: 'Faet',
    image: tokenSvgs.FAE,
  },
  {
    shortName: 'KLP',
    name: 'Kalipo',
    image: tokenSvgs.KLP,
  },
  {
    shortName: 'RGB',
    name: 'RGB',
    image: tokenSvgs.RGB,
  },
];

export const mockTokenDetails: ITokenDetail[] = [
  {
    ...mockTokens[0],
    price: 1.23,
    priceChange: 3.24,
    volume: 1.23,
    liquidity: 7.2,
  },
  {
    ...mockTokens[1],
    price: 1.23,
    priceChange: -3.24,
    volume: 1.23,
    liquidity: 7.2,
  },
  {
    ...mockTokens[2],
    price: 1.23,
    priceChange: 3.24,
    volume: 1.23,
    liquidity: 7.2,
  },
  {
    ...mockTokens[3],
    price: 3.23,
    priceChange: -3.24,
    volume: 1.23,
    liquidity: 7.2,
  },
  {
    ...mockTokens[4],
    price: 10.23,
    priceChange: 3.24,
    volume: 6.43,
    liquidity: 7.2,
  },
  {
    ...mockTokens[5],
    price: 4.23,
    priceChange: -3.24,
    volume: 1.23,
    liquidity: 7.2,
  },
  {
    ...mockTokens[0],
    price: 5.23,
    priceChange: 3.24,
    volume: 4.53,
    liquidity: 7.2,
  },
  {
    ...mockTokens[1],
    price: 7.23,
    priceChange: 3.24,
    volume: 8.23,
    liquidity: 7.2,
  },
  {
    ...mockTokens[2],
    price: 4.23,
    priceChange: 3.24,
    volume: 23.33,
    liquidity: 7.2,
  },
  {
    ...mockTokens[3],
    price: 1.23,
    priceChange: 3.24,
    volume: 1.23,
    liquidity: 7.2,
  },
];
