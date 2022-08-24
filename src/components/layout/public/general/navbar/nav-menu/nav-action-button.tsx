import { Button, Link } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getCsrfToken, signIn } from "next-auth/react";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { has } from "lodash-es";
import NavItem from "./nav-item";

const autoRedirectQueryName = "redirect_to_login";

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

const NavActionButton: React.FC = ({}) => {
  const name = "Launch App";
  const classes = useStyles();

  const formEl = useRef<HTMLFormElement | null>(null);
  const [token, setToken] = React.useState<string | undefined>(undefined);
  const [submitting, setSubmitting] = React.useState(false);
  const router = useRouter();

  return (
    <Link>
      <Button className={classes.actionButton}>{name}</Button>
    </Link>
  );
};

export default NavActionButton;
