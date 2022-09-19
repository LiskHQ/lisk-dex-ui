import * as React from "react";
import { Button, Card, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import SelectToken from "../../select-token/select-token";
import { useRef } from "react";

import { MdEuroSymbol } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";

import { theme, variables } from "../../../../theme";
import convertTokenToEuro from "../../../../lib/utility/token/token";
import useOutsideClick from "../../../../lib/utility/click-functions/outside-click";

const useStyles = makeStyles({
  amountTextTokenSymbolField: {
    borderColor: variables.primary.stone,
    border: "1px solid",
    borderRadius: "4px",
  },
  amountTextTokenField: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  amountTokenField: {
    color: variables.primary.dark,
    backgroundColor: variables.opacities.tokenBackground,
    height: "36px",
    fontSize: "16px",
    fontFamily: "Gilroy",
    marginRight: "6px",
  },
  mdEuroSymbol: {
    fontSize: theme.typography.h4.fontSize,
    display: "inline",
    color: variables.black,
    paddingBottom: "5px",
  },
});

const CssTextField = styled(TextField)({
  ".MuiOutlinedInput-input": {
    fontSize: theme.typography.h3.fontSize,
    width: "229px",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "0px",
    },
  },
});

export default function TokenAmount(props: any) {
  const classes = useStyles();
  const [selectOpen, setSelectOpen] = React.useState(false);
  const clickRef = useRef(null);
  useOutsideClick(clickRef, setSelectOpen);

  const handleTokenName = (tokenName: string) => {
    props.handleToken(tokenName);
  };

  const calculateAmount = (event: { target: { value: string } }) => {
    const value = parseFloat(event.target.value);
    if (Number.isNaN(value)) {
      props.handleAmount(0);
    } else {
      props.handleAmount(value);
    }
  };

  const checkTokenNameValue = () => {
    if (props.token == null || props.token == "") {
      return "Select Token";
    } else {
      return props.token;
    }
  };
  const handlePopularPairing  =(token1:string,token2:string)=>{
    props.handlePopularPairing(token1,token2);
    setSelectOpen(false);
  }

  return (
    <>
      <div className={classes.amountTextTokenSymbolField}>
        <div className={classes.amountTextTokenField}>
          <CssTextField value={props.amount} onChange={calculateAmount} />
          <Button
            onClick={() => {
              setSelectOpen(!selectOpen);
            }}
            className={classes.amountTokenField}
          >
            {checkTokenNameValue()}
            <MdKeyboardArrowDown />
          </Button>
        </div>
        <div className={classes.mdEuroSymbol}>
          <MdEuroSymbol />
          <a>{convertTokenToEuro(props.amount)}</a>
        </div>
      </div>

      <div ref={clickRef}>
        {selectOpen && (
          <Card>
            <SelectToken
              handleTokenName={handleTokenName}
              handleSelectOpen={setSelectOpen}
              handlePopularPairing = {handlePopularPairing}
            />
          </Card>
        )}
      </div>
    </>
  );
}
