import { AppBar, Container, Grid, Link, useMediaQuery } from "@mui/material";
import NavMenu from "../general/navbar/nav-menu/nav-menu";
// ./navbar/nav-menu/nav-menu
import NavActionButton from "./navbar/nav-menu/nav-action-button";
// ../../../../logos/Lisk/logo
import { createStyles, makeStyles } from "@mui/styles";
import { theme, variables } from "../../../../theme";
import SmallScreenNav from "./navbar/small-screen-nav";
import Logo from "../../../../logos/Lisk/logo";

const useStyles = makeStyles(() =>
  createStyles({
    appbar: {
      backgroundColor: variables.white,
      boxShadow: "2px",
      borderBottom: `1px solid ${variables.lineColor}`,
      padding: "10px 0",
      verticalAlign: "center",
    },
    alignRight: {
      display: "flex",
      justifyContent: "flex-end",
    },
    alignCenter: {
      display: "flex",
      justifyContent: "center",
    },
  })
);

const Header = () => {
  const classes = useStyles();
  const isSmScreen = useMediaQuery(theme.breakpoints.down(960));
  return (
    <AppBar position="sticky" color="transparent" className={classes.appbar}>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          spacing={4}
          flexWrap="nowrap"
        >
          {(() => {
            if (!isSmScreen) {
              return (
                <Grid item>
                  <Link>
                    <a>
                      <Logo />
                    </a>
                  </Link>
                </Grid>
              );
            }
          })()}
          <Grid item>{isSmScreen ? <SmallScreenNav /> : <NavMenu />}</Grid>
          <Grid item>
            <NavActionButton name={"Launch App"}></NavActionButton>
          </Grid>
        </Grid>
      </Container>
    </AppBar>
  );
};

export default Header;
