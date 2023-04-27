import * as React from "react";


import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

import { Card, CardContent, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { variables } from "../../../../theme";
import DepositButton from "../common/add-liquidity/set-price-range/deposit-button";
import { MdOutlineClose,MdArrowDownward } from "react-icons/md";

const useStyles = makeStyles({
  cardTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
},
  removeLiquidityCard: {
    position: "absolute",
    top: "20vh",
    left: "40%",
    alignItems: "center",
    zIndex: "",
    textAlign: "left",
    backgroundColor: "#fff",
  },
  removeLiquidityCardContent: {
   
   
  },
  valueTitle: {
    fontSize: "50px",
    fontWeight: "600",
    textAlign: "center",
    margin: "0px",
  },
  numbersButtonsGrid: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  topBanner: {
    borderTop: "1px solid",
    borderColor: variables.lineColor,
  },
  numbersButtonGrid: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    width: "75%",
  },
  numbersButton: {
    fontSize: "14px",
    padding: "2% 5% 2% 5%",
    color: variables.primary.superPurple,
    backgroundColor: "transparent",
    border: "1px solid #E6E6E6",
    borderRadius: "8px",
    "&:focus": {
      backgroundColor: "#EEF0F8",
      border: "1px solid",
      boderColor: variables.primary.superPurple,
    },
  },
  
  numbersInputGrid: {
    width: "25%",
    textAlign: "end",
  },
  customerNumberButton: {
    width: "50%",
    fontSize: "14px",
    padding: "6% 2% 6% 5%",
    border: "0px",
    color: variables.primary.superPurple,
    borderRadius: "4px",
    "&:focus": {
      backgroundColor: "#EEF0F8",
      border: "1px solid",
      boderColor: variables.primary.superPurple,
    },
  },
  customerNumberInput: {
    width: "100%",
    outline: "none",
    fontSize: "14px",
    textAlign: "right",
    border: "0px",
    backgroundColor: "buttonface",
    color: variables.primary.superPurple,
    "&:focus": {
      outline: "none",
      border: "none",
    },
  },
  poolArea: {
    fontWeight: "600",
    backgroundColor: "#FAFBFC",
    border: "1px solid #E7E9F9",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    borderRadius: "8px"
    
  },
  poolAreaToken: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "24px",
    padding: "0% 4% 0% 8%"
  },
  poolAreaPrice: {
    textAlign: "right",
    fontSize: "24px",
    fontWeight: "600"
  },
  submitButton: {
    margin: "5% 0% 0% 2%"                        
  },
  slider: {
    '& .MuiSlider-track': {
        border: 'none',
        height: 12,
      },
      '& .MuiSlider-thumb': {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
          boxShadow: 'inherit',
        },
        '&:before': {
          display: 'none',
        },
      },
      '& .MuiSlider-rail': {
        height: 12
      }
      
  },
  downIcon: {
    fontSize: "20px",
    textAlign: "center",
    width: "100%",
    margin: "5% 0% 0% 0%",
    color: "#4738A6"
  },
  
});

const marks = [
  {
    value: 25,
    label: "25%",
  },
  {
    value: 50,
    label: "50%",
  },
  {
    value: 75,
    label: "75%",
  },
];

function valuetext(value: number) {
  return `${value}`;
}

export default function RemoveLiquidity(props:any) {
  const classes = useStyles();
  const [value, setValue] = React.useState<
    number | string | Array<number | string>
  >(30);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };


  return (
    <>
      <Card className={classes.removeLiquidityCard}>
        <CardContent className={classes.removeLiquidityCardContent}>
          <Box sx={{ width: 400 }}>
            <div className={classes.cardTitle}>
              <h2>Remove Liquidity</h2>
              <i style={{cursor: "pointer"}} onClick={()=>{props.setOpenDropDown(false);
                props.setRemoveLiquidity(false);}}><MdOutlineClose/></i>
            </div>
            <div className={classes.topBanner}>
              <h4>Amount</h4>
              <p className={classes.valueTitle}>{value + "%"}</p>
            </div>
            <Grid container spacing={2} alignItems="center">
              <Grid item></Grid>
              <Grid item xs width="60%" className={classes.slider}>
                <Slider 
                  value={typeof value === "number" ? value : 0}
                  aria-label="Always visible"
                  onChange={handleSliderChange}
                  getAriaValueText={valuetext}
                  aria-labelledby="input-slider"
                  step={1}
                 
                />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              alignItems="center"
              className={classes.numbersButtonsGrid}
            >
              <Grid item className={classes.numbersButtonGrid}>
                {marks.map((item) => {
                  return (
                    <button
                      className={classes.numbersButton}
                      key={item.value}
                      onClick={() => setValue(item.value)}
                    >
                      {item.value+"%"}
                    </button>
                  );
                })}
              </Grid>
              <Grid item className={classes.numbersInputGrid}>
                <button className={classes.customerNumberButton}>
                  <input
                    className={classes.customerNumberInput}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="+"
                    
                    type="number"
                  ></input>
                </button>
              </Grid>
              <i className={classes.downIcon}>
                <MdArrowDownward />
              </i>
            </Grid>
            <Grid container>
              <Grid item width="100%">
                <p>You will recieve</p>
                <div className={classes.poolArea}>
                  <div className={classes.poolAreaToken}>
                    <div>{"ETH"}</div>
                    <div>{(parseFloat(props.amount1)*(value/100)).toFixed(4)}</div>
                  </div>
                  <div className={classes.poolAreaToken}>
                    <div>{"LSK"}</div>
                    <div>{(parseFloat(props.amount2)*(value/100)).toFixed(4)}</div>
                  </div>
                </div>
              </Grid>
              <Grid item width="100%">
              
              <div className={classes.poolAreaPrice}>                    
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center",flexDirection: "row",lineHeight: "0px"}}><p>Price:</p> <p>{"1 LSK = 0.013ETH"}</p></div>
                    {"1 ETH = 1754.234LSK"}
                  </div>
              </Grid>
              <Grid item className={classes.submitButton} width="100%"> 
              <div onClick={()=>{
                props.setOpenDropDown(false);
                props.setRemoveLiquidity(false);
               
              }}>
                <DepositButton buttonTitle={"Remove"} />
              </div>             
              </Grid>
              <Grid item></Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}