import { flagSvgs } from 'imgs/icons';
import { IFiatCurrency } from 'models';

export const mockFiatCurrnecies: IFiatCurrency[] = [
  {
    symbol: 'USD',
    name: 'US Dollar',
    image: flagSvgs.US,
  },
  {
    symbol: 'GBP',
    name: 'British Pound',
    image: flagSvgs.GB,
  }
];