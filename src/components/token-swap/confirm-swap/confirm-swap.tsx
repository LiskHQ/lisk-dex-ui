import * as React from "react";
import {
  Card,
  CardContent,
  List,
  ListItem,
  Typography,
} from "@mui/material";

import { variables } from "../../../theme";
import { makeStyles } from "@mui/styles";
import { MdClose, MdArrowDownward, MdHelpOutline } from "react-icons/md";

const useStyles = makeStyles({
  confirmSwapCard: {
    position: "absolute",
    top: "20vh",
    width: "451px",
    zIndex: "2",
    textAlign: "left",
    backgroundColor: "#fff",
  },
  confirmSwap: {
    fontSize: "20px",
  },
  mdClose: {
    fontSize: "20px",
  },

  confirmSwapButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "16px ",
    backgroundColor: "#1976d2",
    borderRadius: "4px",
    color: variables.white,
    fontSize: "20px",
    marginTop: "32px",
    width: "100%",
    height: "56px",
    justifyContent: "center",
    border: "none"
  },
  mdHelpOutlineIcon: {
    color: variables.primary.darkSilver,
    cursor: "pointer",
  },
  topBanner: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "7%"
  },
  tokenSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    listStyle: "none",
    fontSize: "28px"
  },
  infoList: {
    backgroundColor:"#FAFBFC",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  }
});

export default function ConfirmSwap(props: any) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  
  return (
    <Card className={classes.confirmSwapCard}>
          {open && (
            <CardContent>
            <>
              <div className={classes.topBanner}>
                <Typography className={classes.confirmSwap}>
                  Confirm Swap
                </Typography>
                <MdClose
                  className={classes.mdClose}
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className={classes.tokenSection}>
                <li>
                {props.handleTokenSwapForm.token1}                  
                </li>
                <li>
                {props.handleTokenSwapForm.amount1}  
                </li>
                
              </div>
              <MdArrowDownward />
              <div className={classes.tokenSection}>
              <li>
                {props.handleTokenSwapForm.token2}                  
                </li>
                <li>
                {props.handleTokenSwapForm.amount2}  
                </li>
              </div>
              <div>
                <p>
                  Output is estimated. Your will recieve at least{" "}
                  {props.handleTokenSwapForm.amount2} ETH or the transaction
                  will revert.
                </p>
              </div>
              <List className={classes.infoList}>
                <ListItem>
                  Price
                  <MdHelpOutline className={classes.mdHelpOutlineIcon} />
                </ListItem>
                <ListItem>
                  Minimum Recieved
                  <MdHelpOutline className={classes.mdHelpOutlineIcon} />
                </ListItem>
                <ListItem>
                  Liquidity Provider Fee
                  <MdHelpOutline className={classes.mdHelpOutlineIcon} />
                </ListItem>
                <ListItem>
                  Price Impact
                  <MdHelpOutline className={classes.mdHelpOutlineIcon} />
                </ListItem>
              </List>
              <button
                className={classes.confirmSwapButton}
                type="submit"
                value="Submit"
                onClick={() => {
                  {
                    setOpen(false);
                  }
                }}
              >
                Confirm Swap
              </button>
            </>
          </CardContent>
          )}
        
    </Card>
  );
}
