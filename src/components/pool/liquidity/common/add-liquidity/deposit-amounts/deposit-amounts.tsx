import * as React from "react";
import { makeStyles } from "@mui/styles";
import TokenAmount from "../../../../../token-swap/swap-tokens/card/token-amount";
import FeeTier from "./fee-tier";
import { MdOutlineSwapVerticalCircle } from "react-icons/md";


const useStyles = makeStyles({
  depositAmounts: {
    width: "100%",
  },
  tokenAmounts: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    textAlign: "left",
    gap: "5px",
  },
  feeTier: {
    textAlign: "left",
  },
  mdOutlineSwapVerticalCircle: {
    fontSize: "32px",
    textAlign: "center",  
    cursor: "pointer",
  },
});

export default function DepositAmounts(props:any) {
  const classes = useStyles();
  const [selectOpen, setSelectOpen] = React.useState(false);

  const handlePopularPairing = (token1: string, token2: string) => {
    props.setToken2(token2);
    props.setToken1(token1);
  };

  const handleTokenRotateButtonClick = () => {
    props.setAmount1(props.amount2);
    props.setAmount2(props.amount1);
    props.setToken2(props.token1);
    props.setToken1(props.token2);
  };

  const handleFeeTier  = (value:string) =>{
    props.setFeeTier(value);
  }

  return (
    <section>
      <div className={classes.tokenAmounts}>
        <div>
          <TokenAmount
            handleAmount={props.setAmount1}
            amount={props.amount1}
            handleToken={props.setToken1}
            token={props.token1}
            click={selectOpen}
            handlePopularPairing = {handlePopularPairing}
            
          />
        </div>
        <div
          className={classes.mdOutlineSwapVerticalCircle}
          onClick={() => {
            handleTokenRotateButtonClick();
          }}
        >
          <MdOutlineSwapVerticalCircle />
        </div>
        <div>
          <TokenAmount
            handleAmount={props.setAmount2}
            amount={props.amount2}
            handleToken={props.setToken2}
            token={props.token2}
            click={selectOpen}
            handlePopularPairing={handlePopularPairing}
          />
        </div>
      </div>
      <div className={classes.feeTier}>
        <FeeTier handleFeeTier={handleFeeTier}/>
      </div>      
    </section>
  );
}
