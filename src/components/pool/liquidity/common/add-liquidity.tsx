import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Container, Grid, } from "@mui/material";
import TopBanner from "./add-liquidity/top-banner";
import DepositAmounts from "./add-liquidity/deposit-amounts/deposit-amounts";
import SetPriceRange from "./add-liquidity/set-price-range/set-price-range";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles ({
  container: {
    padding: "5%"
  },
  card: {
    width: "95%"
  }
})

export default function AddLiquidity() {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Card className={classes.card}>
        <CardContent>
          <TopBanner />
          <Grid container spacing={6} direction="row">
            <Grid item lg={6}>
              <DepositAmounts />
            </Grid>
            <Grid item lg={6}>
              <SetPriceRange />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
