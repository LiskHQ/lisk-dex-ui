import { Card } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { variables } from "../../../../theme";
import ConfirmSwap from "../../../token-swap/confirm-swap/confirm-swap";
import TokenAmount from "../../../token-swap/swap-tokens/card/token-amount";
import PreviewScreen from "../common/add-liquidity/preview-screen/preview-screen";
import DepositButton from "../common/add-liquidity/set-price-range/deposit-button";
import { IdepositAmounts } from "../common/models/liquidity-models";

const useStyles = makeStyles({
  tokenAmount: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "15px",
  },
  addLiquidityButton: {
    width: "100%",
    height: "52px",
    marginBottom: "16px",
    border: "0px",
    borderRadius: "4px",
    backgroundColor: variables.primary.superPurple,
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
  },
  previewScreen: {
    pointerEvents: "none"
  }
});

export default function IncreaseLiquidity(props: any) {
  const classes = useStyles();
  const [token1, setToken1] = React.useState("");
  const [token2, setToken2] = React.useState("");
  const [amount1, setAmount1] = React.useState("");
  const [amount2, setAmount2] = React.useState("");
  const [feeTier, setFeeTier] = React.useState("");
  const [minPrice, setMinPrice] = React.useState("0");
  const [maxPrice, setMaxPrice] = React.useState("0");
  const [currentPrice, setCurrentPrice] = React.useState("3000");
  const [previewOpen, setPreviewOpen] = React.useState(false);

  const [depositAmount, setDepositAmount] = React.useState<IdepositAmounts>({
    token1: "",
    token2: "",
    amount1: "",
    amount2: "",
    feeTier: "",
  });
  const [priceRange, setPriceRange] = React.useState<IpriceRange>({
    minPrice: "",
    maxPrice: "",
    currentPrice: "",
  });


  const handlePreview = () => {
    setDepositAmount({
      token1: props.token1Id,
      token2: props.token2Id,
      amount1: amount1,
      amount2: amount2,
      feeTier: feeTier,
    });
    setPriceRange({
      minPrice: minPrice,
      maxPrice: maxPrice,
      currentPrice: currentPrice,
    });

  };

  const handlePreviewOpen = (clickEvent: boolean) => {
    setPreviewOpen(clickEvent);
  };

  return (
    <>
      <div className={classes.tokenAmount}>
        <div>
          <TokenAmount token={props.token1Id} handleAmount={setAmount1}/>
        </div>
        <div>
          <TokenAmount token={props.token2Id} handleAmount={setAmount2}/>
        </div>
        <div>
          <button 
                        onClick={() => {
                          handlePreview();
                          setPreviewOpen(true);
                        }}
                        className={classes.addLiquidityButton}>Add Liquidity</button>
        </div>
      </div>
      <div>
      {previewOpen && (
            <Card className={classes.previewScreen}>
              <PreviewScreen
                depositAmount={depositAmount}
                priceRange={priceRange}
                open={true}
                handlePreviewOpen={handlePreviewOpen}
                
              />
            </Card>
          )}
      </div>
    </>
  );
}
