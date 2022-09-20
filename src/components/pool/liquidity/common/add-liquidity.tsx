import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Container, Grid, } from "@mui/material";
import TopBanner from "./add-liquidity/top-banner";
import DepositAmounts from "./add-liquidity/deposit-amounts/deposit-amounts";
import SetPriceRange from "./add-liquidity/set-price-range/set-price-range";



export default function AddLiquidity() {
  return (
    <Container>
      <Card>
        <CardContent>
          <TopBanner />
          <Grid container spacing={2} direction="row">
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
