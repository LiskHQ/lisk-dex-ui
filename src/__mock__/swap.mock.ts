import { IToken, ITokenDetail } from 'models';

export const mockBalance = 4521.425;

export const mockTokens: IToken[] = [
  {
    chainID: '04000011',
    chainName: 'Lisk',
    tokenID: '0400001100000000',
    tokenName: 'Lisk',
    networkType: 'devnet',
    description: 'Default token for the entire Lisk ecosystem',
    logo: {
      png: 'https://raw.githubusercontent.com/LiskHQ/app-registry/main/devnet/Lisk/images/tokens/lisk.png',
      svg: 'https://raw.githubusercontent.com/LiskHQ/app-registry/main/devnet/Lisk/images/tokens/lisk.svg'
    },
    symbol: 'LSK',
    displayDenom: 'lsk',
    baseDenom: 'beddows',
    denomUnits: [
      {
        denom: 'beddows',
        decimals: 0,
        aliases: [
          'Beddows'
        ]
      },
      {
        denom: 'lsk',
        decimals: 8,
        aliases: [
          'Lisk'
        ]
      }
    ]
  },
  {
    chainID: '04000011',
    chainName: 'Lisk',
    tokenID: '0DEX00000000000000',
    tokenName: 'DEX',
    networkType: 'devnet',
    description: 'Default token for the DEX ecosystem',
    logo: {
      png: 'https://github.com/LiskHQ/lisk-dex-service/blob/28-implement-getting-available-tokens/dex.png',
      svg: 'https://github.com/LiskHQ/lisk-dex-service/blob/28-implement-getting-available-tokens/dex.svg'
    },
    symbol: 'DEX',
    displayDenom: 'dex',
    baseDenom: 'dex',
    denomUnits: [
      {
        denom: 'dex',
        decimals: 0,
        aliases: [
          'dex'
        ]
      },
      {
        denom: 'dex',
        decimals: 8,
        aliases: [
          'Dex'
        ]
      }
    ]
  },
];

export const mockTokenDetails: ITokenDetail[] = [
  {
    name: 'Lisk',
    price: 1.23,
    priceChange: +3.24,
    volume24H: 1.23,
    liquidity: 7.2,
    tokenID: '0400001100000000',
    symbol: 'LSK'
  },
  {
    name: 'Bazar',
    price: 1732.25,
    priceChange: -4.54,
    volume24H: 1.23,
    liquidity: 7.2,
    tokenID: '0000000000000002',
    symbol: 'BZR'
  },
  {
    name: 'doEDU',
    price: 1.23,
    priceChange: +3.24,
    volume24H: 1.23,
    liquidity: 7.2,
    tokenID: '0000000000000003',
    symbol: 'EDU'
  },
];
