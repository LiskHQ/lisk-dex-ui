import { flagSvgs } from "imgs/icons";
import { IFiatCurrency } from "models";

export const mockFiatCurrnecies: IFiatCurrency[] = [
  {
    shortName: 'USD',
    name: 'US Dollar',
    image: flagSvgs.US,
  },
  {
    shortName: 'GBP',
    name: 'British Pound',
    image: flagSvgs.GB,
  }
]