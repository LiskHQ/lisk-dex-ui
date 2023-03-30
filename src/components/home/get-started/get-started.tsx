import { Button, Link } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  actionButton: {
    color: "white",
    backgroundColor: "#6953F4",
    border: `solid 1px`,
    borderRadius: "4px",
    marginRight: 0,
    marginTop: "15px",
    width: "161px",
    height: "44px",
    padding: "12px, 36px, 12px, 36px",
  },
  fullWidth: {
    width: "100%",
  },
  verticalMenu: {
    width: "100%",
    marginTop: "1px",
    marginLeft: 0,
  },
});

const GetStarted = (props) => {
  const { name } = props;
  const classes = useStyles();
  return (
    <Link>
      <Button className={classes.actionButton}>{name}</Button>
    </Link>
  );
};

export default GetStarted;
