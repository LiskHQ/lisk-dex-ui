import { makeStyles } from "@mui/styles";
import React from "react";
import {MdAdd , MdRemove} from "react-icons/md";

interface Iprops {
  buttonTitle: string;
  amount: string;
  tokenTitle: string;

}

const useStyles = makeStyles({
    button: {
        width: "45%",
        border: "1px solid #e0e2f1",
        borderRadius: "6px",
        height: "100px",
        backgroundColor: "transparent",
        '&:focus': {
            border: "1px solid #6953F4",            
        },
        cursor: "pointer"
    },
    buttonFont: {
        margin: "0px 0px 0px 0px",
        padding: "0px 0px 0px 0px"
    },
    amountAndIcons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
})

export default function PriceBanner(props: Iprops) {
    const classes  = useStyles();
    const [calculatedAmount, setCalculatedAmount] = React.useState(props.amount);

    const { buttonTitle, tokenTitle} = props;
    
    const incrementOrDcrementAmount = (increment:boolean)=>{
        var amountVal:number = parseInt(calculatedAmount);
        if (increment){       
            amountVal++;
        }
        else if (!increment){
            amountVal--;       
        }
        if (amountVal>0 ){
            setCalculatedAmount(amountVal.toString());
        }else{
            setCalculatedAmount("0");
        }        
    };

  return (
    <button className={classes.button}>
      <h5 className={classes.buttonFont}>{buttonTitle}</h5>
      <div className={classes.amountAndIcons}>
      <i onClick={()=>{incrementOrDcrementAmount(true)}}><MdAdd /></i>
      <h2>{calculatedAmount}</h2>
      <i onClick={()=>{incrementOrDcrementAmount(false)}}><MdRemove /></i>      
      </div>
      <h5 className={classes.buttonFont}>{tokenTitle}</h5>
    </button>
  );
}
