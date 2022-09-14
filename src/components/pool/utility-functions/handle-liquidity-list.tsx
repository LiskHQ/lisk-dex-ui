import LiquidityList from "./liquidity-list";
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles({
    liquidityList: {
        textAlign: "center",
        marginBottom: "5%",
        color: "#6B7280"
    },
    liquidityListTitle: {
      marginBottom: "5%"
    }
})

export function handleLiquidityList () {
    const classes = useStyles();
    if (LiquidityList.length == 0) {      
        return (
            <div className={classes.liquidityList}>
              <p className={classes.liquidityListTitle}>Your active V1 liquidity positions will appear here</p>
              <p>Don't see a pool you joined</p>
              <a href="">Explore existing pools</a>
             
            </div>
          );
    }
  };