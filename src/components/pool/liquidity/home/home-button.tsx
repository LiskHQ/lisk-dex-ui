import { makeStyles } from "@mui/styles";

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
        backgroundColor: "#6953F4",
        color: "white",
        fontSize: "16px",
        cursor: "pointer"
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