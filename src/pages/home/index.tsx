import { Container, Grid, Typography } from "@mui/material";
import { withLayout } from "@moxy/next-layout";
// ../../src/components/layout/public/general
import GetStarted from "/src/components/home/get-started/get-started";
import BannerImage from "/src/components/home/banner-image/banner-image";
import { createStyles, makeStyles } from "@mui/styles";
import { Layout } from "components/common";

const useStyles = makeStyles(() =>
  createStyles({
    row: {
      marginBottom: "80px",
      // backgroundColor:'red'
    },
    mainHeadline: {
      color: "#161133",
      width: "597px",
      height: "216px",
      fontSize: "64px",
      lineHeight: "72px",
      fontFamily: "Gilroy",
      textAlign: "left",
    },
    captionHealine: {
      color: "#818181",
      width: "511px",
      height: "56px",
      fontSize: "20px",
      fontWeight: "400",
      lineHeight: "29px",
      fontFamily: "Roboto",
      textAlign: "left",
    },
    alignRight: {
      display: "flex",
      justifyContent: "flex-end",
    },
    alignCenter: {
      display: "flex",
      justifyContent: "center",
    },
  })
);

const LiskHome = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <Grid
        container
        spacing={12}
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        className={classes.row}
      >
        <Grid item lg={6}>
          <Typography className={classes.mainHeadline}>
            Bringing the decentralized blockchain network.
          </Typography>
          <Typography className={classes.captionHealine}>
            Swap, create pools, add liquidity and earn on the LiskDEX
            decentralized crypto blockchain protocol.
          </Typography>
          <GetStarted name={"Get Started"}></GetStarted>
        </Grid>
        <Grid item lg={6}>
          <BannerImage />
        </Grid>
      </Grid>
      <Grid container spacing={2} flexDirection="column" alignItems="center">
        <Grid item lg={12}>
          <Typography>About the Protocol</Typography>
        </Grid>
        <Grid item lg={6} textAlign="center">
          <Typography>
            LiskDEX is a decentralized cryptocurrency exchange without a central
            authority providing users efficient trading..
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default withLayout(<Layout />)(LiskHome);
