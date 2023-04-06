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
import { checkTokenNameValue } from "../../../../lib/utility/swap-pool-functions/swap-pool-functions";

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
    fontSize: "16px",
    fontFamily: "Gilroy",
    marginRight: "6px",
    padding: "2px",
    borderRadius: "4px"
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
    width: "500px",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "1px",
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
            disabled={props.tokenSectionDisable!=null?props.tokenSectionDisable:false}
          >
            {checkTokenNameValue(props.token)}
            <MdKeyboardArrowDown />
          </Button>
        </div>
      </div>
      <div className={classes.mdEuroSymbol}>
          <MdEuroSymbol />
          <a>{convertTokenToEuro(props.amount)}</a>
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
