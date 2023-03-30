import * as React from "react";
import { Button, Card, CardContent, List, ListItem, Typography } from "@mui/material";
import PopularPairings from "./popular-pairings";
import { makeStyles } from "@mui/styles";
import CryptoList from "../crypto-list";
import { MdSearch, MdOutlineArrowForward } from "react-icons/md";
import { theme, variables } from "../../../theme";

MdOutlineArrowForward
const useStyles = makeStyles({
  selectToken: {
    textAlign: "center",
    margin: "20px 0px 0px 0px",
    fontWeight: "600"
  },
  tokenList: {
    position: "absolute",
    top: "20vh",
    width: "451px",
    zIndex: "2",
    textAlign: "left",
    backgroundColor: "#fff",
  },
  cryptoListArray: {
    height: "40vh",
    overflow: "hidden",
    overflowY: "scroll",

  },
  cryptoListArrayItem: {
    width: "100%",
    justifyContent: "left"
  },
  searchBar: {
    border: "none",
    backgroundColor: "transparent",
    resize: "none",
    outline: "none",
    width: "100%",
    color: variables.primary.darkSilver
  },
  searchBarIcon: {
    color: variables.primary.darkSilver
  },
  searchDiv: {

    display: "flex",
    lineHeight: "52px",
    fontSize: "20px",
    paddingLeft: "3%",
    padding: "16px 0px 16px 0px",
    backgroundColor: "#F2F5F9",
    borderRadius: "4px",
    marginBottom: "24px",
  },
  popularPairing: {
    color: variables.black,
    lineHeight: "18px",
    fontSize: theme.typography.h5.fontSize,
    fontWeight: theme.typography.h5.fontWeight,
    pointerEvents: "none",

  },
  popularPairingArray: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    paddingBottom: "24px",
    borderBottom: "1px solid #E7E9F9"

  },
  popularPairingIcon: {
    lineHeight: "12px",
    margin: "0px 4px 0px 4px",
    color: "#4738A6"
  },
  popularPairingArrayItem: {
    backgroundColor: "#F2F5F9",
    border: "none",
    width: "129px",
    lineHeight: "12px",
    padding: "14px 0px 14px 0px",
    borderRadius: "4px",
    margin: "0px 0px 15px 0px",
    fontWeight: "600",
  }
});

export default function SelectToken(props: any) {
  const classes = useStyles();
  const [searchInput, setSearchinput] = React.useState("");

  const handleTokenName = (tokenName: string) => {
    props.handleTokenName(tokenName);
    props.handleSelectOpen(false);
  };

  const handleSearchInput = (input: string) => {
    setSearchinput(input);
  };

  return (
    <Card className={classes.tokenList}>
      <Typography className={classes.selectToken}>Select Token</Typography>
      <CardContent>
        <div className={classes.searchDiv}>
          <MdSearch className={classes.searchBarIcon} />

          <input
            className={classes.searchBar}
            type="text"
            onChange={(event) => {
              handleSearchInput(event.target.value);
            }}
            data-testid="search-input"
            placeholder={"Search name or paste address"}
          />

        </div>
        <section>
          <p className={classes.popularPairing}>Popular Pairing</p>
          <div
            className={classes.popularPairingArray}
            onClick={() => {
              props.handleSelectOpen(false);
            }}>

            {PopularPairings.map((item, index) => {
              return (
                <div key={index}>
                  <button
                    className={classes.popularPairingArrayItem}
                    onClick={() => { props.handlePopularPairing(item.token1, item.token2) }}
                    data-testid={"popular-pairing-" + item.token1 + "," + item.token2}>
                    {item.token1}
                    <MdOutlineArrowForward className={classes.popularPairingIcon} />
                    {item.token2}
                  </button>
                </div>
              );
            })}
          </div>
          <div>
            <List className={classes.cryptoListArray}>
              {CryptoList.map((item, index) => {
                if (searchInput.length === 0) {
                  return (
                    <ListItem key={index}>
                      <Button
                        className={classes.cryptoListArrayItem}
                        onClick={() => {
                          handleTokenName(item.label);
                        }}
                        data-testid={"token-name-" + item.label}
                      >
                        {item.label}
                      </Button>
                    </ListItem>
                  );
                } else if (
                  item.label
                    .toLowerCase()
                    .includes(searchInput.toLocaleLowerCase(), 0)
                ) {
                  return (
                    <ListItem key={index}>
                      <Button
                        onClick={() => {
                          handleTokenName(item.label);
                        }}
                        data-testid={"token-name-" + item.label}
                      >
                        {item.label}
                      </Button>
                    </ListItem>
                  );
                }
              })}
            </List>
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
