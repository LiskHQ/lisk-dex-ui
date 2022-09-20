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

export default function DepositAmounts() {
  const classes = useStyles();
  const [selectOpen, setSelectOpen] = React.useState(false);
  const [token1, setToken1] = React.useState("");
  const [token2, setToken2] = React.useState("");

  const [amount1, setAmount1] = React.useState("");
  const [amount2, setAmount2] = React.useState("");

  const handlePopularPairing = (token1: string, token2: string) => {
    setToken2(token2);
    setToken1(token1);
  };

  const handleTokenRotateButtonClick = () => {
    setAmount1(amount2);
    setAmount2(amount1);
    setToken2(token1);
    setToken1(token2);
  };


  return (
    <section>
      <div className={classes.tokenAmounts}>
        <div>
          <TokenAmount
            handleAmount={setAmount1}
            amount={amount1}
            handleToken={setToken1}
            token={token1}
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
            handleAmount={setAmount2}
            amount={amount2}
            handleToken={setToken2}
            token={token2}
            click={selectOpen}
            handlePopularPairing={handlePopularPairing}
          />
        </div>
      </div>
      <div className={classes.feeTier}>
        <FeeTier />
      </div>
    </section>
  );
}
