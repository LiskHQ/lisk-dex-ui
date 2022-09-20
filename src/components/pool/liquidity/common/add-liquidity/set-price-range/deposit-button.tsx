import { makeStyles } from "@mui/styles"
import { variables } from "../../../../../../theme"

interface Iprops {
    buttonTitle: string
}

const useStyles = makeStyles({
    button: {
        width: "100%",
        border: "0px",
        borderRadius: "4px",
        color: variables.white,
        backgroundColor: variables.primary.superPurple
    }
})
export default function DepositButton(props:Iprops){
    const classes = useStyles();
    return(
        <button className={classes.button}>
            <h1>
                {props.buttonTitle}
            </h1>
        </button>
    )
}