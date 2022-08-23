import { Link } from "@mui/material";
import { useRouter } from "next/router";
import variables from "../../../../../../theme/variables";
import { startsWith } from "lodash-es";
import { makeStyles } from "@mui/styles";
import { theme } from "../../../../../../theme";
import { alpha } from "@material-ui/core";
import cn from "classnames";

export interface IProps {
  name: string;
  route: string | Function;
  matcher?: string;
  isVerticalMenu?: boolean;
  signedUser?: boolean;
  persistLocation?: boolean;
  annotation?: string;
}

const useStyles = makeStyles({
  link: {
    textTransform: "capitalize",
    color: variables.primary.superPurple,
    padding: "22px 30px",
    textDecoration: "none",
    width: "100%",
    whiteSpace: "nowrap",
    textAlign: "center",
    transition: "color 0.2s ease",

    "&:hover": {
      color: variables.primary.main,
    },
  },
  activeLink: {
    fontWeight: "bold",
  },
  verticalMenu: {
    fontWeight: "bold",
    textAlign: "left",
    padding: "6px 14px",
    width: "240px",
    borderRadius: "8px",
    marginBottom: theme.spacing(1),
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    "&:hover": {
      backgroundColor: alpha(variables.black, 0.08),
    },
  },
  verticalMenuActive: {
    backgroundColor: `${alpha(variables.black, 0.08)}`,
  },
  annotation: {
    color: variables.primary.light,
    marginLeft: "3px",
    fontSize: "12px",
  },
});

const NavItem: FC<IProps> = ({
  children,
  name,
  route,
  matcher,
  isVerticalMenu,
  signedUser,
}) => {
  const classes = useStyles();
  const router = useRouter();
  const { pathName } = router || { pathname: "" };
  const isActive = startsWith(pathName, matcher);
  const isLink = typeof route === "string";

  const handleClick = () => {
    if (route && typeof route === "function") {
      //console.log(route("www.google.com"));
      route("www.google.com");
    }
  };

  if (signedUser && !persistLocation) {
    return null;
  }
  return (
    <Link className={classes.link}>
      <a
        onClick={handleClick}
        className={cn({
          [classes.link]: true,
          [classes.activeLink]: isActive && !isVerticalMenu,
          [classes.verticalMenu]: isVerticalMenu,
          [classes.verticalMenuActive]: isVerticalMenu && isActive,
        })}
      >
        {<>{children || name}</>}
      </a>
    </Link>
  );
};
export default NavItem;
