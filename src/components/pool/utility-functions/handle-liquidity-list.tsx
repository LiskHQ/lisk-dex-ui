import LiquidityList from "./liquidity-list";
import { makeStyles } from "@mui/styles";
import { MdKeyboardArrowDown } from "react-icons/md";
import React from "react";
import { variables } from "../../../theme";
import { ILiquidityList } from "../../../lib/types/add-liquidity";

const useStyles = makeStyles({
  liquidityList: {
    textAlign: "center",
    marginBottom: "5%",
    color: "#6B7280",
  },
  liquidityListTitle: {
    marginBottom: "5%",
  },
  liquidityListPool: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  liquidityListPoolDetails: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "1px solid",
    borderColor: variables.lineColor,
    padding: "2% 0% 0% 0%",
  },
  liquidityListPoolDetail: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  liquiditybuttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "30px",
    padding: "2%",

  },
  liquiditybutton: {
    fontSize: "16px",
    fontWeight: "500",
    width: "100%",
    background: "transparent",
    border: "1px solid",
    borderColor: variables.primary.superPurple,
    borderRadius: "4px",
    padding: "2%",
    color: variables.primary.superPurple,
    cursor: "pointer",
    '&:focus': {
      background: variables.primary.superPurple,
      color: variables.white,
      border: "1px solid",
      borderColor: variables.primary.superPurple,
  }
  },
});

export default function handleLiquidityList() {
  const classes = useStyles();
  const [openDropDown, setOpenDropDown] = React.useState(false);
  const [clickedToken, setClickedToken] = React.useState<ILiquidityList>(false);
  const handleLiquidityListDropDown = () => {
    setOpenDropDown(!openDropDown);
  };
  if (LiquidityList.length == 0) {
    return (
      <div className={classes.liquidityList}>
        <p className={classes.liquidityListTitle}>
          Your active V1 liquidity positions will appear here
        </p>
        <p>Do not see a pool you joined</p>
        <a href="">Explore existing pools</a>
      </div>
    );
  } else {
    return LiquidityList.map((item) => {
      return (
        <>
          <div className={classes.liquidityListPool} key={item.token1Id}>
            <div>
              <p>{item.token1Id + "/" + item.token2Id}</p>
            </div>
            <div>
              <i>
                <MdKeyboardArrowDown
                  onClick={() => {                    
                    handleLiquidityListDropDown();
                    setClickedToken(item);
                    console.log(clickedToken);
                  }}
                />
              </i>
            </div>
          </div>
          <div>
            {openDropDown && (
              <>
                <div className={classes.liquidityListPoolDetails}>
                  <div className={classes.liquidityListPoolDetail}>
                    <p>Pooled {item.token1Id}</p>
                    <p>{item.pooledtoken1}</p>
                  </div>
                  <div className={classes.liquidityListPoolDetail}>
                    <p>Pooled {item.token2Id}</p>
                    <p>{item.pooledtoken2}</p>
                  </div>
                  <div className={classes.liquidityListPoolDetail}>
                    <p>Your pool tokens</p>
                    <p>{item.poolTokens}</p>
                  </div>
                  <div className={classes.liquidityListPoolDetail}>
                    <p>Pool share</p>
                    <p>{item.poolShare}</p>
                  </div>
                  <div className={classes.liquidityListPoolDetail}>
                    <p>Accumulated Fees</p>
                    <p>
                      {item.accumulatedFeesToken1 +
                        "  " +
                        item.accumulatedFeesToken2}
                    </p>
                  </div>
                  <div className={classes.liquidityListPoolDetail}>
                    <p>Total Fees</p>
                    <p>{item.totalFees}</p>
                  </div>
                </div>
                <div>
                  <div className={classes.liquiditybuttons}>
                    <button  autoFocus={true} className={classes.liquiditybutton}>
                      Add Liquidity +
                    </button>
                    <button className={classes.liquiditybutton}>
                      Remove Liquidity -
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className={classes.liquidityList}>
          <p>Do not see a pool you joined</p>
          <a>Explore existing pools</a>
          </div>
        </>
      );
    });
  }
}