import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";

import { Container, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

import SwapTokens from "../swap-token";

const useStyles = makeStyles({
  grid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
  },
  card: {
    width: "473px",
  },
});

export default function SwapToken() {
  const classes = useStyles();
  return (
    <Container maxWidth={"lg"}>
      <Grid container className={classes.grid}>
        <Card className={classes.card}>
          <CardContent>
            <Grid>
              <Typography variant="body1" color="text.secondary">
                <SwapTokens />
              </Typography>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Container>
  );
}
