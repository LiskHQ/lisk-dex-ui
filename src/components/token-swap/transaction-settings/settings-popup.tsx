import {
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useRef } from "react";
import { MdHelpOutline, MdClose, MdOutlineSettings } from "react-icons/md";
import useOutsideClick from "../../../lib/utility/click-functions/outside-click";
import { theme, variables } from "../../../theme";

const toleranceArray = [
  {
    value: "0.5%",
  },
  {
    value: "1.0%",
  },
  {
    value: "2%",
  },
  {
    value: "+",
  },
];

const useStyles = makeStyles({
  settingsBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  overlay: {
    position: "absolute",
    zIndex: "2",
    width: "max-content",
  },
  cardContentTypography: {
    textAlign: "left",
    display: "inline",
    fontSize: theme.typography.h3.fontSize,
    lineHeight: theme.typography.h2.fontSize,
    color: variables.black,
    fontWeight: theme.typography.h3.fontWeight,
    fontFamily: "Gilroy",
  },
  mdOutlineSettings: {
    fontSize: "24px",
    cursor: "pointer",
  },
  transactionSettings: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "24px",
    borderBottom: "1px solid #E1E1E1",
    lineHeight: "24px",
    fontSize: "20px",
  },
  mdClose: {
    fontSize: "24px",
    cursor: "pointer",
  },
  slippeageTolearance: {
    display: "flex",
    flexDirection: "row",
    width: "50%",
    justifyContent: "space-between",
    alignItems: "center",
    lineHeight: "20px",
    fontSize: "16px",
    marginTop: "32px",
  },

  slippeageTolearanceButton: {
    backgroundColor: "#EEF0F8",
    border: "1.5px solid #6953F4",
    borderRadius: "4px",
    marginRight: "5px",
    marginTop: "12px",
    width: "23%"
    
  },

  mdHelpOutlineIcon: {
    color: variables.primary.darkSilver,
    cursor: "pointer",
  },
  transactionDeadline: {
    display: "flex",
    flexDirection: "row",
    alignItems: "end",
  },
  transactionDeadlineTextBox: {
    width: "30%",
    backgroundColor: "#F2F5F9",
    border: "0px",
    lineHeight: "44px",
    borderRadius: "4px",  
    marginTop: "12px"
  },
  transactionDeadlineText: {
    display: "inline-block",
    alignItems: "center",
    paddingLeft: "5px",
    color: variables.primary.darkSilver,
  
  },
  saveButton: {
      display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: "16px 168px",
  backgroundColor: "#1976d2",
  borderRadius: "4px",
  border: "0px",
  color: variables.white,
  lineHeight: "24px",
  fontSize: "20px",
  marginTop: "32px",
  },
});

const SettingsPopup = (props: any) => {
  const classes = useStyles();
  // create state `open` with default as false
    const [open, setOpen] = React.useState(false);
  const checkClick = useRef(null);
  useOutsideClick(checkClick, setOpen);
  const [transactionDeadline, setTransactionDeadline] = React.useState("");

  return (
    <div>
      <div ref={checkClick} className={classes.settingsBox}>
        <Typography className={classes.cardContentTypography} data-testid="swap-tokens">
          Swap Tokens
        </Typography>

        <MdOutlineSettings
          className={classes.mdOutlineSettings}
          onClick={() => {
            if (open) {
              setOpen(false);
            } else {
              setOpen(true);
            }
          }}
          type="button"
          data-toggle="modal"
          data-testid="md-outline-settings"
        />
        {open && (
          <Card className={classes.overlay}>
            <CardContent>
              <div >
                <Typography className={classes.transactionSettings} data-testid="transaction-settings">
                  Transaction Settings
                  <MdClose
                    className={classes.mdClose}
                    onClick={() => setOpen(false)}
                  />
                </Typography>
              </div>
              <Typography className={classes.slippeageTolearance}>
                Slippeage Tolearance
                <MdHelpOutline className={classes.mdHelpOutlineIcon} />
              </Typography>
              <div>
              {toleranceArray.map((item) => {
                return (
                  <>
                    <Button
                      className={classes.slippeageTolearanceButton}
                      onClick={() => {
                        props.handleSlippeageTolerance(item.value);
                      }}
                      data-testid={"slippeage-tolearance-"+item.value}
                    >
                      {item.value}
                    </Button>
                  </>
                );
              })}
              </div>

              <Typography className={classes.slippeageTolearance}>
                Transaction Deadline
                <MdHelpOutline className={classes.mdHelpOutlineIcon} />
              </Typography>
              <div className={classes.transactionDeadline}>
                <input
                  data-testid="transaction-deadline"
                  className={classes.transactionDeadlineTextBox}
                  onChange={(event) => {
                    setTransactionDeadline(event.target.value);
                    props.handleTransactionDeadline(event.target.value);
                  }}
                  value={transactionDeadline}
                  
                />
                <Typography className={classes.transactionDeadlineText}>
                  minutes
                </Typography>
              </div>
              <button className={classes.saveButton}
              onClick={() => {
                {
                  setOpen(false);
                }
              }}>
                Save
              </button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SettingsPopup;
