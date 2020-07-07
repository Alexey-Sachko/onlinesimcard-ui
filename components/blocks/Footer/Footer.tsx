import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import Logo from "../../layout/Logo";
import CustomContainer from "../CustomContainer";

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: "#E9F0FF",
    paddingTop: "50px",
    paddingBottom: "50px",
    [theme.breakpoints.down("xs")]: {
      paddingTop: "30px",
      paddingBottom: "30px",
    },
  },
  description: {
    fontSize: "18px",
    lineHeight: "22px",
    fontFamily: `'Open Sans', sans-serif`,
    maxWidth: "400px",
    marginBottom: "30px",
    color: "#000000",
    [theme.breakpoints.down("xs")]: {
      fontSize: "13px",
    },
  },
  email: {
    fontSize: "18px",
    fontWeight: "bold",
    fontFamily: `'Libre Baskerville', sans-serif`,
    lineHeight: "22px",
    color: "#1E71FF",
    [theme.breakpoints.down("xs")]: {
      fontSize: "13px",
    },
  },
  gridContainer: {
    [theme.breakpoints.down("md")]: {
      flexDirection: "column-reverse",
    },
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <CustomContainer>
        <Grid
          container
          justify="space-between"
          spacing={2}
          className={classes.gridContainer}
        >
          <Grid item>
            <Typography variant="subtitle2" className={classes.description}>
              Cервис по приему SMS-сообщений на виртуальные номера.
            </Typography>
            <Typography className={classes.email}>
              simcardonline@mail.ru
            </Typography>
          </Grid>
          <Grid item>
            <Box height="100%" display="flex" alignItems="center">
              <Logo variant="dark" />
            </Box>
          </Grid>
        </Grid>
      </CustomContainer>
    </Box>
  );
};

export default Footer;
