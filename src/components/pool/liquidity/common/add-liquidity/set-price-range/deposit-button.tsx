import { makeStyles } from "@mui/styles"
import { variables } from "../../../../../../theme"

interface Iprops {
    buttonTitle: string
}

const useStyles = makeStyles({
    button: {
        width: "100%",
        border: "0px",
        borderRadius: "8px",
        color: variables.white,
        backgroundColor: variables.primary.superPurple,
        fontSize: "20px",
        margin: "2% 0% 0% 0%",
        cursor: "pointer"
    }
})
export default function DepositButton(props:Iprops){
    const classes = useStyles();
    return(
        <button className={classes.button}>
            <p>
                {props.buttonTitle}
            </p>
        </button>
    )
}