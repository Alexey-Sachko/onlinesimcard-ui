import React from "react";
import { makeStyles } from "@material-ui/core";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  logoImg: {
    maxHeight: "25px",
    [theme.breakpoints.up("sm")]: {
      maxHeight: "30px",
    },
    [theme.breakpoints.up("lg")]: {
      maxHeight: "35px",
    },
  },
  link: {
    textDecoration: "none",
  },
}));

type Props = {
  variant?: "light" | "dark";
};

const Logo = ({ variant = "light" }: Props) => {
  const classes = useStyles();
  return (
    <Link href="/">
      <a className={classes.link}>
        <img
          className={classes.logoImg}
          src={
            // variant === "light"
            // ?
            "/static/logo.png"
            // : "/static/logo-light-bg.svg"
          }
          alt="OnlineSIMCARD"
        />
      </a>
    </Link>
  );
};

export default Logo;
