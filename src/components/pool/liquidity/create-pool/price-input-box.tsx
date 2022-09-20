import { styled } from "@mui/material/styles";
import { theme, variables } from "../../../../theme";
import {TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";




const useStyles = makeStyles({
    amountTextTokenField: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderColor: variables.primary.stone,
        border: "1px solid",
        borderRadius: "4px",
        height: "56px"
        
      },
      inputFieldText: {
        padding: "0px 0px 0px 5px",
        width: "100%",
        fontSize: "20px",
        lineHeight: "24px",
        color: variables.primary.darkSilver,
        textAlign: "left"
      }
})

interface Iprops {
    defaultText:string
}
const CssTextField = styled(TextField)({
    ".MuiOutlinedInput-input": {
      fontSize: theme.typography.h3.fontSize,
      width: "100%",
      color: variables.primary.dark,
      
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "0px",
      },
    },
  });



export default function PriceInputBox(props:Iprops){
    const classes = useStyles();
    const handleInputValue=()=>{
        if (props.defaultText!= null){
            return (<p className={classes.inputFieldText}>Current LSK per ETH price</p>)
        }
    }
    return (
        <>
            <div className={classes.amountTextTokenField}>
            {handleInputValue()}
            <CssTextField/>
            </div>
        </>
        
    )
}