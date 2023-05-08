import { tokenSvgs } from "imgs/icons";
import { IToken } from "models";

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
]