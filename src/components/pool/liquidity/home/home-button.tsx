import { makeStyles } from "@mui/styles";
import { variables } from "../../../../theme";

interface IProps{
    buttonTitle:string
}
const useStyles = makeStyles({
    poolHomeButton: {
        width: "100%",
        height: "52px",
        marginBottom: "16px",
        border: "0px",
        borderRadius: "4px",
        backgroundColor: variables.primary.superPurple,
        color: "white",
        fontSize: "16px",
        cursor: "pointer",
        '&:focus': {
            background: "transparent",
            color: variables.primary.superPurple,
            border: "1px solid",
            borderColor: variables.primary.superPurple,
        }
      }
})

export default function PoolHomeButton(props:IProps){
    const classes = useStyles();
    const buttonTitle = props.buttonTitle;
    return(
        <button className={classes.poolHomeButton}>
            {buttonTitle+` +`}
        </button>
    )
}