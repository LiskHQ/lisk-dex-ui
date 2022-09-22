import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { MdKeyboardArrowDown } from "react-icons/md";
import handleLiquidityList from "../../utility-functions/handle-liquidity-list";
import theme from "../../../../theme/theme";
import PoolHomeButton from "./home-button";
import { MdHelpOutline } from "react-icons/md";
import { variables } from "../../../../theme";
import LiquidityList from "../../utility-functions/liquidity-list";

const useStyles = makeStyles({
  grid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "700px",
    marginTop: "10%",
    padding: "0px 32px 0px 32px",
  },
  bottomBanner: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "nowrap",
    margin: "4% 0% 0% 0%",
    alignItems: "center",
    borderTop: "1px solid #D9D8F8",
    padding: "38px 0px 0px 0px",
  },
  cardTitle: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: "600",
    margin: "15px 0px 0px 0px",
  },
  cardTitleCaption: {
    fontSize: theme.typography.h5.fontSize,
    fontWeight: "400",
    lineHeight: "22px",
    marginBottom: "5%",
    color: "#6B7280",
  },
  poolHomeButtonFirst: {
    backgroundColor: "#6953F4",
  },
  poolHomeButtonSecond: {
    backgroundColor: "none",
  },
  liquidityButton: {
    border: "1px solid #D9D8F8",
    fontSize: "16px",
    color: "#535353",
    borderRadius: "4px",
    width: "208px",
    height: "36px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
    padding: "10px 0px 0px 0px",
    cursor: "pointer",
    backgroundColor: "transparent",
  },
  mdHelpOutlineIcon: {
    color: variables.primary.darkSilver,
    cursor: "pointer",
  },
  bottomBannerTextAndIcon: {
    display: "flex",
    flexDirection: "row",
    width: "25%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomBannerInfoIcon: {
    padding: "5px 0px 0px 0px",
  },
});

export default function LiquidityHome() {
  const classes = useStyles();

  return (
    <Container maxWidth={"lg"}>
      <Grid container className={classes.grid}>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.cardTitle}>
              Pools Overview
            </Typography>
            <Typography className={classes.cardTitleCaption}>
              Add Liquidity to earn LP tokens
            </Typography>
            <div>
              <PoolHomeButton buttonTitle="Add Position" />
            </div>
            <div>
              <PoolHomeButton buttonTitle="Create a Pool" />
            </div>
            <div className={classes.bottomBanner}>
              <div className={classes.bottomBannerTextAndIcon}>
                <h3>Your Liquidity</h3>
                <i className={classes.bottomBannerInfoIcon}>
                  <MdHelpOutline className={classes.mdHelpOutlineIcon} />
                </i>
              </div>
              <div>
                <button className={classes.liquidityButton}>
                  <a>Active Liquidity ({LiquidityList.length})</a>
                  <i>
                    <MdKeyboardArrowDown />
                  </i>
                </button>
              </div>
            </div>
            <div>{handleLiquidityList()}</div>
          </CardContent>
        </Card>
      </Grid>
    </Container>
  );
}
