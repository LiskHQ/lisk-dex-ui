import * as React from "react";
import {
  Card,
  CardContent,
} from "@mui/material";

import { variables } from "../../../../../../theme";
import { makeStyles } from "@mui/styles";
import { MdClose } from "react-icons/md";
import useOutsideClick from "../../../../../../lib/utility/click-functions/outside-click";

const useStyles = makeStyles({
  confirmSwapCard: {
    position: "absolute",
    top: "20vh",
    left: "32.5%",
    width: "35%",
    zIndex: "2",
    textAlign: "left",
    backgroundColor: "#fff",
  },
  confirmSwap: {
    fontSize: "20px",
  },
  mdClose: {
    fontSize: "20px",
  },

  confirmLiquidityButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "16px ",
    backgroundColor: variables.primary.superPurple,
    borderRadius: "4px",
    color: variables.white,
    fontSize: "20px",
    marginTop: "32px",
    width: "100%",
    height: "56px",
    justifyContent: "center",
    border: "none"
  },
  mdHelpOutlineIcon: {
    color: variables.primary.darkSilver,
    cursor: "pointer",
  },
  topBanner: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap"
  },
  tokenSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    listStyle: "none",
    fontSize: "28px"
  },
  poolTokens: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  poolTokenNames: {
    fontSize: "28px"
  },
  poolTokenText: {
    fontSize: "16px",
    fontWeight: "600",
  },
  poolArea: {
   
    fontWeight: "600",
    backgroundColor: "#FAFBFC",
     borderRadius: "8px", 
     padding: "1% 3% 1% 3%",
     border: "1px solid #E7E9F9",
  },
  poolAreaToken: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "20px",
  },
  poolAreaTokenFeeTier: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "20px",
    marginTop: "2%",
  },
  selectedRange: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",  
    
  },
  selectedRangeButtons: {
    backgroundColor: "#E7E9F9",
    alignItems: "center", 
    borderRadius: "4px", 
    padding: "1px 1px 2px 1px" 
  },
  selectedRangeButton: {
    border: "0px",
    borderRadius: "4px",
    backgroundColor: "#E7E9F9",
    padding: "4px 10px 4px 10px",
    "&:focus": {
      backgroundColor: variables.white,
    } 
  },
  priceButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
    marginBottom: "2%"
  },
  priceButton: {
    textAlign: "center",
    backgroundColor: "#FAFBFC",
    borderRadius: "8px",
    border: "1px solid #E7E9F9",
    padding: "0%",
  },
  currentPrice: {
    width: "100%",
    textAlign: "center",
    backgroundColor: "#FAFBFC",
    borderRadius: "8px",
    border: "1px solid #E7E9F9",
    fontWeight: "500"
  }

});

export default function PreviewScreen(props: any) {
  const classes = useStyles();
  const checkClick = React.useRef(null);
  useOutsideClick(checkClick, props.handlePreviewOpen);
  return (
    <Card  className={classes.confirmSwapCard}>
      {
        <CardContent ref={checkClick}>          
            <div className={classes.topBanner}>
              <h1 className={classes.confirmSwap}>
                Add Liquidity
              </h1>
              <MdClose
                className={classes.mdClose}
                onClick={() => {
                  props.handlePreviewOpen(false);
                  }
                }
              />
            </div>
            <div className={classes.poolTokens}>
              <div className={classes.poolTokenNames}>
                <p>
                  {props.depositAmount.token1 +
                    " / " +
                    props.depositAmount.token2}
                </p>
              </div>
              <div className={classes.poolTokenText}>
                <p>In range</p>
              </div>
            </div>
            <div className={classes.poolArea}>
              <div className={classes.poolAreaToken}>
                <div>{props.depositAmount.token1}</div>
                <div>{props.depositAmount.amount1}</div>
              </div>
              <div className={classes.poolAreaToken}>
                <div>{props.depositAmount.token2}</div>
                <div>{props.depositAmount.amount2}</div>
              </div>
              <div className={classes.poolAreaTokenFeeTier}>
                <div>Fee Tier</div>
                <div>{props.depositAmount.feeTier}</div>
              </div>
            </div>
            <div className={classes.selectedRange}>
              <h3>Selected Range</h3>
              <div className={classes.selectedRangeButtons} >
              <button className={classes.selectedRangeButton}>{props.depositAmount.token1}</button>
              <button className={classes.selectedRangeButton}>{props.depositAmount.token2}</button>
              </div>              
            </div>
            <div className={classes.priceButtons}>
              <div className={classes.priceButton}>
                <p style={{margin: '6% 0% 0% 0%'}}>Min Price</p>
                <p style={{margin: '0px', fontWeight: '500'}} >{props.priceRange.minPrice}</p>
                <p style={{margin: '0px'}}>{props.depositAmount.token1} per {props.depositAmount.token2}</p>
                <p style={{color: '#6B7280'}}>Your position will be 100% composed of {props.depositAmount.token1} at this price.</p>
              </div>
              <div className={classes.priceButton}>
                <p style={{margin: '6% 0% 0% 0%'}}>Max Price</p>
                <p style={{margin: '0px', fontWeight: '500'}}>{props.priceRange.maxPrice}</p>
                <p style={{margin: '0px'}}>{props.depositAmount.token1} per {props.depositAmount.token2}</p>
                <p  style={{color: '#6B7280'}}>Your position will be 100% composed of {props.depositAmount.token2} at this price.</p>
              </div>              
            </div>
            <div className={classes.currentPrice}>
              <div>
                <p>Current Price</p>
                <p>{props.priceRange.currentPrice}</p>
                <p>ETH per LSK</p>
              </div>
            </div>
            <button
              className={classes.confirmLiquidityButton}
              type="submit"
              value="Submit"
              onClick={() => {                
                props.handlePreviewOpen(false);
                if (props.setOpenDropDown!=null){
                  props.setOpenDropDown(false);
                }
                if (props.setIncreaseLiquidity!=null){
                  props.setIncreaseLiquidity(false);
                }
              }}
            >
              Add Liquidity
            </button>
          
        </CardContent>
      }
    </Card>
  );
}