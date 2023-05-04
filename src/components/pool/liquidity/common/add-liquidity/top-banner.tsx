import { makeStyles } from "@mui/styles";
import { MdKeyboardBackspace, MdOutlineSettings } from "react-icons/md";

const useStyles = makeStyles({
    section: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    backSpaceIcon: {
        fontSize: "16px"
    },
    addLiquidity: {

    },
    clearAndsettingsIcon: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        
    },
    clear: {
       
    },
    settingsIcon: {
        fontSize: "24px",
        padding: "5px 0px 0px 0px"
    }

})
export default function TopBanner() {
    const classes = useStyles();
    return (
    <>
      <section className={classes.section}>
        <i className={classes.backSpaceIcon}><MdKeyboardBackspace/></i>
        <h1 className={classes.addLiquidity}>Add Liquidity</h1>
        <div className={classes.clearAndsettingsIcon}>
          
          <i className={classes.settingsIcon}><MdOutlineSettings/></i>
        </div>
      </section>
    </>
  );
}
