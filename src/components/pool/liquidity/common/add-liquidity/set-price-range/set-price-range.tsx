import { makeStyles } from "@mui/styles";
import React from "react";
import CreatePool from "../../../create-pool/create-pool";
import PriceBanner from "./price-banner";



const useStyles = makeStyles({
  setPriceRange: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  priceBanner: {
    padding: "10px 0px 0px 0px",
  },
  priceBannerTitle: {
    fontSize: "20px",
    fontWeight: "600",
    margin: "0px 0px 12px 0px",
  },
  priceBannerButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default function SetPriceRange(props:any) {

  const classes = useStyles();

  return (
    <section className={classes.setPriceRange}>
      {/* 
      {() => {
        if (componentName.toLowerCase() === "position") {
          return <div>position</div>;
        } else if (componentName.toLowerCase() === "createpool") {
          return <div>createpool</div>;
        }
      }}
       */}
      <CreatePool />
      <div className={classes.priceBanner}>
        <div className={classes.priceBannerTitle}>Set price range</div>
        <div className={classes.priceBannerButton}>
          <PriceBanner
            buttonTitle={"Min Price"}
            amount={"0"}
            tokenTitle={"Eth per DAI"}
            setPrice = {props.setMinPrice}
          />
          <PriceBanner
            buttonTitle={"Max Price"}
            amount={"0"}
            tokenTitle={"Eth per DAI"}
            setPrice = {props.setMaxPrice}
          />
        </div>
      </div>

      
    </section>
  );
}
