import { makeStyles } from "@mui/styles"
import { variables } from "../../../../../../theme"

const useStyles = makeStyles({
    button: {
        width: "100%",
        border: "0px",
        borderRadius: "4px",
        color: variables.white,
        backgroundColor: variables.primary.superPurple
    }
})
export default function DepositButton(){
    const classes = useStyles();
    return(
        <button className={classes.button}>
            <h1>
                Set Price Range
            </h1>
        </button>
    )
}