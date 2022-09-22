import { ILiquidityList } from "../../../lib/types/add-liquidity";

// this is the list of all available loquidity pools and will be feteched from the backend after development of micrservices
const LiquidityList: ILiquidityList [] = [
    {
      token1Id: "ETH",
      token2Id: "LSK",
      pooledtoken1: "24.312",
      pooledtoken2: "22.234",
      poolTokens: "24.48",
      poolShare: "0.12",
      accumulatedFeesToken1: "24.34",
      accumulatedFeesToken2: "2.48",      
      totalFees: "4.82",    
    }
  ];
  
export default LiquidityList;
  