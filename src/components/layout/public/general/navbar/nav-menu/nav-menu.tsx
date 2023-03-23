import { List, ListItem } from "@mui/material";
import NavMenuItems from "../nav-menu/nav-item-list";
import NavItem from "./nav-item";
import cn from "classnames";
import { useRouter } from "next/router";
import { makeStyles } from "@mui/styles";
import constants from "../../../../../../config/constants";

interface IProps {
  isVerticalMenu?: boolean;
  onCloseNav?: () => void;
}

const useStyles = makeStyles({
  list: {
    padding: 0,
  },
  vertical: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  horizontal: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  item: {
    padding: 0,
  },
  userMenuItem: {
    color: "black",
    display: "flex",
    cursor: "pointer",
    padding: "8px 20px",
    transition: "color 0.2s ease",
    "&:hover": {
      color: "pink",
    },
    ["576"]: {
      padding: "6px 14px",
    },
  },
  userHomeIcon: {
    width: "17px",
    height: "22px",
    marginRight: "3px",
  },
  verticalItemColor: {
    fontWeight: "bold",
  },
});

const NavMenu: FC<IProps> = ({ isVerticalMenu }) => {
  const classes = useStyles();
  const router = useRouter();
  const { query } = router || { query: { params: [] } };
  let params = query.params as string[];

  if (typeof window !== "undefined" && !params) {
    if (sessionStorage.getItem(constants.lastSearch)) {
      params = sessionStorage
        .getItem(constants.lastSearch)
        ?.split("/") as string[];
    }
  }

  return (
    <>
      <List
        className={cn({
          [classes.list]: true,
          [classes.horizontal]: !isVerticalMenu,
          [classes.vertical]: isVerticalMenu,
        })}
      >
        {NavMenuItems.map((navItem) => {
          const { name, routeCallback, matcher } = navItem;
          return (
            <ListItem className={classes.item} key={name}>
              <NavItem
                isVerticalMenu={isVerticalMenu}
                matcher={matcher}
                name={name}
                route={routeCallback(params)}
              />
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default NavMenu;
