import { tokenSvgs } from 'imgs/icons';
import { IToken, ITokenDetail } from 'models';

export const mockBalance = 4521.425;

export const mockTokens: IToken[] = [
    {
      chainID: "04000000",
      chainName: "Lisk",
      tokenID: "0400000000000000",
      tokenName: "Lisk",
      networkType: "devnet",
      description: "Default token for the entire Lisk ecosystem",
      logo: {
          png: "https://raw.githubusercontent.com/LiskHQ/app-registry/main/devnet/Lisk/images/tokens/lisk.png",
          svg: "https://raw.githubusercontent.com/LiskHQ/app-registry/main/devnet/Lisk/images/tokens/lisk.svg"
      },
      symbol: "LSK",
      displayDenom: "lsk",
      baseDenom: "beddows",
      denomUnits: [
          {
              "denom": "beddows",
              "decimals": 0,
              "aliases": [
                  "Beddows"
              ]
          },
          {
              "denom": "lsk",
              "decimals": 8,
              "aliases": [
                  "Lisk"
              ]
          }
      ]
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
