import { makeStyles } from "@mui/styles";
import { variables } from "../../../../theme";




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
      },
      input: {
        padding: "0px 0px 0px 5px",
        width: "25%",
        fontSize: "20px",
        lineHeight: "24px",
        borderRadius: "4px",
        textAlign: "left",
        height: "50px",
        border: "0px solid black",
        outline: "none",
      },

})


export default function PriceInputBox(props:any){
    const classes = useStyles();
    const handleInputValue=()=>{
        if (props.defaultText!= null){
            return (<p className={classes.inputFieldText}>Current {props.token1} per {props.token2} price</p>)
        }
    }
    return (
        <>
            <div className={classes.amountTextTokenField}>
            {handleInputValue()}
            <input data-testid="amount-input" className={classes.input} >            
            </input>            
            </div>
        </>
        
    )
}