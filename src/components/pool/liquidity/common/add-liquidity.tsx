import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Container, Grid } from "@mui/material";
import TopBanner from "./add-liquidity/top-banner";
import DepositAmounts from "./add-liquidity/deposit-amounts/deposit-amounts";
import SetPriceRange from "./add-liquidity/set-price-range/set-price-range";
import { makeStyles } from "@mui/styles";
import PreviewScreen from "./add-liquidity/preview-screen/preview-screen";
import DepositButton from "./add-liquidity/set-price-range/deposit-button";
import { IdepositAmounts, IpriceRange } from "../../../../lib/types/pool/pool";

const useStyles = makeStyles({
  container: {
    padding: "5%",
  },
  card: {
    width: "95%",
  },
});

export default function AddLiquidity() {
  const classes = useStyles();
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

  const [token1, setToken1] = React.useState("");
  const [token2, setToken2] = React.useState("");
  const [amount1, setAmount1] = React.useState("");
  const [amount2, setAmount2] = React.useState("");
  const [feeTier, setFeeTier] = React.useState("");
  const [minPrice, setMinPrice] = React.useState("0");
  const [maxPrice, setMaxPrice] = React.useState("0");
  const [currentPrice, setCurrentPrice] = React.useState("3000");

  // const handleDepositAmountToken1 = (val:string) =>{
  //   setDepositAmount({token1:val, token2: "",amount1: "",amount2: "",feeTier: ""});
  //   console.log(depositAmount);
  // }

  const handlePreview = () => {
    setDepositAmount({
      token1: token1,
      token2: token2,
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
    <Container className={classes.container}>
      <Card className={classes.card}>
        <CardContent>
          <TopBanner />
          <Grid container spacing={6} direction="row">
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <DepositAmounts
                token1={token1}
                token2={token2}
                amount1={amount1}
                amount2={amount2}
                setToken1={setToken1}
                setToken2={setToken2}
                setAmount1={setAmount1}
                setAmount2={setAmount2}
                setFeeTier={setFeeTier}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <SetPriceRange
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
                setCurrentPrice={setCurrentPrice}
                depositAmount={depositAmount}
                priceRange={priceRange}
                token1={token1}
                token2={token2}

              />
            </Grid>
          </Grid>
          <Grid>
            <div
              onClick={() => {
                handlePreview();
                setPreviewOpen(true);
              }}
            >
              <DepositButton buttonTitle={"Preview"} />
            </div>
          </Grid>
          {previewOpen && (
            <Card>
              <PreviewScreen
                depositAmount={depositAmount}
                priceRange={priceRange}
                open={true}
                handlePreviewOpen={handlePreviewOpen}
              />
            </Card>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
