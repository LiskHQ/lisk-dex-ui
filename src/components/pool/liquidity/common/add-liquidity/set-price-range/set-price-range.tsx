import { makeStyles } from "@mui/styles";
import React from "react";
import DepositButton from "./deposit-button";
import PriceBanner from "./price-banner";

interface Iprops {
  componentName: string;
}

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

export default function SetPriceRange(props: Iprops) {
  const componentName: string = props.componentName;
  const [buttonTitle, setButtonTile] = React.useState("Enter an Amount");
  const [userInputAmount, setUserInputAmount] = React.useState("");
  const [currentLSKperTokenAmount, setCurrentLSKperTokenAmount] = React.useState("");
  const [minAmount, setminAmount] = React.useState("");
  const [maxAmount, setmaxAmount] = React.useState("");
  
  const classes = useStyles();

  const handelButtonTitle = () =>{
    if (userInputAmount==null || userInputAmount.toLowerCase() == "0"){
      return("Enter an Amount");
    }else if (minAmount==null || minAmount.toLowerCase() == "0" || maxAmount==null || maxAmount.toLowerCase() == "0"){
      return("Set price Range");
    }
  }

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
      <div className={classes.priceBanner}>
        <div className={classes.priceBannerTitle}>Set price range</div>
        <div className={classes.priceBannerButton}>
          <PriceBanner
            buttonTitle={"Min Price"}
            amount={"0"}
            tokenTitle={"Eth per DAI"}
          />
          <PriceBanner
            buttonTitle={"Max Price"}
            amount={"0"}
            tokenTitle={"Eth per DAI"}
          />
        </div>
      </div>

      <div>
        <DepositButton buttonTitle={buttonTitle}/>
      </div>
    </section>
  );
}
