import React from "react";
import Typography from "@material-ui/core/Typography";
import Header from "../Header/Header";
import Footer from "../Footer";
import { makeStyles } from "@material-ui/core/styles";

const Forbidden = () => {
  const classes = useStyles();
  return (
    <>
      <Header blueBg />
      <div className={classes.container}>
        <div className={classes.content}>
          <Typography variant="h1" align="center">
            403
          </Typography>
        </div>
        <div className={classes.footer}>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Forbidden;

const useStyles = makeStyles(() => ({
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "80px",
  },
  footer: {
    // flexGrow: 1,
  },
}));
