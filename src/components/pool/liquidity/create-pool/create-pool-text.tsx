import { makeStyles } from "@mui/styles"

const useStyles = makeStyles ({
    textField: {
        fontSize: "14px",
        lineHeight: "24px",
        backgroundColor: "#E7E9F9",
        padding: "16px",
        border: "1px solid #6953F4",
        borderRadius: "8px",
        margin: "0px",
        fontWeight: "500"
    }
}) 
export default function CreatePoolText(){
    const classes = useStyles();
    return(
        <>
            <p className={classes.textField}>
            This pool must be initialized before you can add liquidity. To initialize, select a starting price for the pool. Then, enter your liquidity price range and deposit amount. Gas fees will be higher than usual due to the initialization transaction.
        </p>
        </>
        

    )
}