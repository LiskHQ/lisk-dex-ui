import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

import { variables } from "../../../theme";
import { makeStyles } from "@mui/styles";
import SettingsPopup from "../transaction-settings/settings-popup";
import TokenAmount from "./card/token-amount";

import { SwapTokenInterface } from "../../../lib/types/swap-token";
import { MdOutlineSwapVerticalCircle } from "react-icons/md";

import ConfirmSwap from "../confirm-swap/confirm-swap";
import { Card } from "@mui/material";

const useStyles = makeStyles({
  grid: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "20%",
  },
  cardContentTypography: {
    textAlign: "left",
    display: "inline",
  },
  tokenAmount: {
    width: "100%",
  },
  list: {
    height: "50vh",

    overflow: "hidden",
    overflowY: "scroll",
  },
  firstToken: {
    margin: "40px 0px 12px 0px",
  },
  secondToken: {
    margin: "12px 0px 24px 0px",
  },
  mdOutlineSwapVerticalCircle: {
    fontSize: "32px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    cursor: "pointer",
  },
  swapButton: {
    display: "flex",
flexDirection: "row",
justifyContent: "center",
alignItems: "center",
padding: "16px 168px",
backgroundColor: "#1976d2",
borderRadius: "4px",
border: "0px",
color: variables.white,
lineHeight: "24px",
fontSize: "20px",
marginTop: "32px",
width: "100%"
},
});


export default function SwapTokens() {
  const classes = useStyles();

  const [selectOpen, setSelectOpen] = React.useState(false);
  const [confirmSwap, setconfirmSwap] = React.useState(false);
  const [tokenSwapForm, setTokenSwapForm] = React.useState({});

  const [token1, setToken1] = React.useState("");
  const [token2, setToken2] = React.useState("");

  const [amount1, setAmount1] = React.useState("");
  const [amount2, setAmount2] = React.useState("");

  const [transactionDeadline, setTransactionDeadline] = React.useState("");
  const [slippeageTolerance, setSlippeageTolerance] = React.useState("");

  const handleTokenRotateButtonClick = () => {
    setAmount1(amount2);
    setAmount2(amount1);
    setToken2(token1);
    setToken1(token2);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const tokenSwapForm: SwapTokenInterface = {
      slippeageTolerance,
      transactionDeadline,
      token1,
      token2,
      amount1,
      amount2,
    };
    setTokenSwapForm(tokenSwapForm);
    setconfirmSwap(true);
  };

  const handleConfirmSwapClick = (clickEvent: boolean) => {
    setconfirmSwap(clickEvent);
  };

  const handlePopularPairing = (token1:string,token2:string) =>{
    setToken2(token2);
    setToken1(token1);
  }

  

  return (
    <>
      <div>
        <SettingsPopup
          handleTransactionDeadline={setTransactionDeadline}
          handleSlippeageTolerance={setSlippeageTolerance}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div
          className={classes.firstToken}
          onClick={() => {
            setSelectOpen(true);
          }}
        >
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
        <div
          className={classes.secondToken}
          onClick={() => {
            setSelectOpen(false);
          }}
        >
          <TokenAmount
            handleAmount={setAmount2}
            amount={amount2}
            handleToken={setToken2}
            token={token2}
            click={selectOpen}
            handlePopularPairing = {handlePopularPairing}
          />
        </div>
        <button 
        className={classes.swapButton}          
          type="submit"
          value="Submit">
          Swap
        </button>
      </form>
      <div>
        {confirmSwap && (
          <Card>
            <ConfirmSwap
              handleTokenSwapForm={tokenSwapForm}
              handleConfirmSwapClick={handleConfirmSwapClick}
              open={true}
            />
          </Card>
        )}
      </div>
    </>
  );
}
