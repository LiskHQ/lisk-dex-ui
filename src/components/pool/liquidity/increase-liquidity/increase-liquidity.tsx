import { makeStyles } from "@mui/styles";
import React from "react";
import { IdepositAmounts, IpriceRange } from "../../../../lib/types/pool/pool";
import { variables } from "../../../../theme";
import TokenAmount from "../../../token-swap/swap-tokens/card/token-amount";
import PreviewScreen from "../common/add-liquidity/preview-screen/preview-screen";

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
    pointerEvents: "none",
  },
});

export default function IncreaseLiquidity(props: any) {
  const classes = useStyles();
  const [amount1, setAmount1] = React.useState("");
  const [amount2, setAmount2] = React.useState("");
  const [feeTier, setFeeTier] = React.useState("0.3%");
  const [minPrice, setMinPrice] = React.useState("0.002132");
  const [maxPrice, setMaxPrice] = React.useState("0.006322");
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
      token1: props.item.token1Id,
      token2: props.item.token2Id,
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
        <h3>Increase Liquidity</h3>
        <div>
          <TokenAmount token={props.item.token1Id} amount={amount1} handleAmount={setAmount1} tokenSectionDisable={true}/>
        </div>
        <div>
          <TokenAmount token={props.item.token2Id} amount={amount2} handleAmount={setAmount2} tokenSectionDisable={true}/>
        </div>
        <div>
          <button
            onClick={() => {
              handlePreview();
              setPreviewOpen(true);
            }}
            className={classes.addLiquidityButton}
          >
            Add Liquidity
          </button>
        </div>
      </div>
      <div>
        {previewOpen && (
          <PreviewScreen
            className={classes.previewScreen}
            depositAmount={depositAmount}
            priceRange={priceRange}
            handlePreviewOpen={handlePreviewOpen}
            setOpenDropDown={props.setOpenDropDown}
            setIncreaseLiquidity={props.setIncreaseLiquidity}
          />
        )}
      </div>
    </>
  );
}
