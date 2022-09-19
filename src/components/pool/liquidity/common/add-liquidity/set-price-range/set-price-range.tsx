import { makeStyles } from "@mui/styles";
import DepositButton from "./deposit-button";
import PriceBanner from "./price-banner";

interface Iprops {
  componentName: string;
}

const useStyles = makeStyles({
  setPriceRange: {
    display: "flex",
    flexDirection: "column",
    gap: "25px",
  },
  priceBanner: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default function SetPriceRange(props: Iprops) {
  const componentName: string = props.componentName;
  const classes = useStyles();
  return (
    <section className={classes.setPriceRange}>
      {() => {
        if (componentName.toLowerCase() === "position") {
          return <div>position</div>;
        } else if (componentName.toLowerCase() === "createpool") {
          return <div>createpool</div>;
        }
      }}
      <div className={classes.priceBanner}>
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
      <div>
        <DepositButton />
      </div>
    </section>
  );
}
