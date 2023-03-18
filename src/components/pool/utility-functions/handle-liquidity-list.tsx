import LiquidityList from "./liquidity-list";
import { makeStyles } from "@mui/styles";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import React from "react";
import { variables } from "../../../theme";
import { LiquidityListInterface } from "../../../lib/types/pool/pool";

import IncreaseLiquidity from "../liquidity/increase-liquidity/increase-liquidity";
import RemoveLiquidity from "../liquidity/remove-liquidity/remove-liquidity";
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
    border: "1px solid",
    borderRadius: "8px 8px 0px 0px ",
    borderColor: variables.lineColor,
    padding: "0% 2% 0% 2%",
  },
  liquidityListPoolDetails: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "1px solid",
    borderColor: variables.lineColor,
    padding: "2% 2% 2% 2%",
    border: "1px solid",
    borderRadius: "0px 0px 4px 4px ",
  },
  liquidityListPoolDetail: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    fontWeight: "500",
    lineHeight: "7px",
  },
  liquiditybuttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "30px",
    padding: "2%",
    width: "100%",
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
    "&:focus": {
      background: variables.primary.superPurple,
      color: variables.white,
      border: "1px solid",
      borderColor: variables.primary.superPurple,
    },
  },
  increaseLiquidity: {
    borderColor: variables.lineColor,
    padding: "2% 2% 2% 2%",
    border: "1px solid",
  },
  removeLiquidity: {
    borderColor: variables.lineColor,
    padding: "2% 2% 2% 2%",
    border: "1px solid",
  },
});

export default function HandleLiquidityList() {
  const classes = useStyles();
  const [openDropDown, setOpenDropDown] = React.useState<boolean>(false);
  const [clickedToken, setClickedToken] =
    React.useState<LiquidityListInterface>({
      token1Id: "0",
      token2Id: "0",
      feeTier: "0",
      pooledtoken1: "0",
      pooledtoken2: "0",
      poolTokens: "0",
      poolShare: "0",
      accumulatedFeesToken1: "0",
      accumulatedFeesToken2: "0",
      totalFees: "0"
    });
  const [increaseLiquidity, setIncreaseLiquidity] =
    React.useState<boolean>(false);
  const [downArrow, setDownArrow] = React.useState<boolean>(true);
  const [upArrow, setUpArrow] = React.useState<boolean>(false);
  const [removeLiquidity, setRemoveLiquidity] = React.useState<boolean>(false);

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
          <div
            className={classes.liquidityListPool}
            key={item.token1Id}
            onClick={() => {
              handleLiquidityListDropDown();
              setClickedToken(item);
              setUpArrow(!upArrow);
              setDownArrow(!downArrow);
            }}
          >
            <div>
              <p>{item.token1Id + "/" + item.token2Id}</p>
            </div>
            <div>
              {downArrow && (
                <i
                  data-testid="arrow-down-button"
                  onClick={() => {
                    handleLiquidityListDropDown();
                    setClickedToken(item);
                    setUpArrow(!upArrow);
                    setDownArrow(!downArrow);
                  }}
                >
                  <MdKeyboardArrowDown />
                </i>
              )}
              {upArrow && (
                <i>
                  <MdKeyboardArrowUp
                    onClick={() => {
                      handleLiquidityListDropDown();
                      setClickedToken(item);
                      setUpArrow(!upArrow);
                      setDownArrow(!downArrow);
                    }}
                  />
                </i>
              )}
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

                  <div className={classes.liquiditybuttons}>
                    <button
                      autoFocus={true}
                      className={classes.liquiditybutton}
                      onClick={() => {
                        setIncreaseLiquidity(!increaseLiquidity);
                      }}
                      data-testid="increase-liquidity-button"
                    >
                      Add Liquidity +
                    </button>
                    <button
                      className={classes.liquiditybutton}
                      onClick={() => {
                        setRemoveLiquidity(!removeLiquidity);
                      }}
                    >
                      Remove Liquidity -
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          {openDropDown && increaseLiquidity && (
            <div className={classes.increaseLiquidity}>
              <IncreaseLiquidity
                item={clickedToken}
                setOpenDropDown={setOpenDropDown}
                setIncreaseLiquidity={setIncreaseLiquidity}
              />
            </div>
          )}
          {openDropDown && removeLiquidity && (
            <div>
              <RemoveLiquidity amount1={clickedToken.pooledtoken1} amount2={clickedToken.pooledtoken2} setOpenDropDown={setOpenDropDown} setRemoveLiquidity={setRemoveLiquidity}/>
            </div>
          )}
          <div className={classes.liquidityList}>
            <p>Do not see a pool you joined</p>
            <a>Explore existing pools</a>
          </div>
        </>
      );
    });
  }
}
