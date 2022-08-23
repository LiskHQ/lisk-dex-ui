import { Drawer, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { FC, useCallback, useState } from "react";
import Logo from "../../../../../logos/Lisk/logo";
import NavMenu from "./nav-menu/nav-menu";
import { theme, variables } from "../../../../../theme";

const useStyles = makeStyles({
  icon: {
    color: variables.black,
    "&:hover": {
      cursor: "pointer",
    },
  },
  drawer: {
    padding: `0 ${theme.spacing(2)} ${theme.spacing(2)}`,
  },
  logo: {
    display: "block",
    padding: "8px 0",
  },
});

const SmallScreenNav: FC = () => {
  const classes = useStyles();
  const [openNav, setOpenNav] = useState(false);

  const closeNav = () => {
    setOpenNav(false);
  };

  const NavToggle = useCallback(() => {
    setOpenNav(!openNav);
  }, [openNav, setOpenNav]);

  return (
    <>
      <Drawer
        classes={{ paper: classes.drawer }}
        open={openNav}
        data-testid="small-screen-nav"
        onClose={closeNav}
        onClick={NavToggle}
      >
        <div className={classes.logo}>
          <Logo />
        </div>
        <NavMenu isVerticalMenu onCloseNav={closeNav} />
      </Drawer>
      <IconButton
        data-testid="small-screen-nav-button"
        onClick={NavToggle}
        className={classes.icon}
      >
        <Logo />
      </IconButton>
    </>
  );
};
export default SmallScreenNav;
