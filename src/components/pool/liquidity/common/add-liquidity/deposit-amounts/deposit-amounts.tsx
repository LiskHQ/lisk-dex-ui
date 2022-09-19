import { makeStyles } from "@mui/styles";
import TokenAmount from "../../../../../token-swap/swap-tokens/card/token-amount";
import FeeTier from "./fee-tier";

const useStyles = makeStyles({
  depositAmounts: {
    width: "100%",
  },
  tokenAmounts: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignContent: "center",
    textAlign: "left",
    gap: "56px",
  },
  feeTier: {
    textAlign: "left"
  }
});

export default function DepositAmounts() {
  const classes = useStyles();
  return (
    <section>
      <div className={classes.tokenAmounts}>
        <div>
          <TokenAmount />
        </div>
        <div>
          <TokenAmount />
        </div>
      </div>
      <div className={classes.feeTier}>
        <FeeTier />       
      </div>
    </section>
  );
}
