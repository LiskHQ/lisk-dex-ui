import { Link } from "@mui/material";
import { theme } from "../../../../../theme";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  link: {
    marginRight: theme.spacing(4),
  },
  register: {
    marginRight: 0,
  },
  links: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    height: "100%",
  },
});

const MobileNavBar = () => {
  const classes = useStyles();
  return (
    <div className={classes.links}>
      <Link className={classes.link} variant="button">
        About
      </Link>
      <Link className={classes.link} variant="button">
        Help and Support
      </Link>
      <Link className={classes.link} variant="button">
        Legal and Privacy
      </Link>
    </div>
  );
};

export default MobileNavBar;
