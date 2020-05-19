import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("sm")]: {
      margin: "0 20px",
    },
    [theme.breakpoints.up("md")]: {
      margin: "0 40px",
    },
    [theme.breakpoints.up("lg")]: {
      margin: "0 60px",
    },
    [theme.breakpoints.up("xl")]: {
      margin: "0 140px",
    },
  },
}));

const CustomContainer: React.FC = ({ children }) => {
  const classes = useStyles();
  return <Box className={classes.root}>{children}</Box>;
};

export default CustomContainer;
