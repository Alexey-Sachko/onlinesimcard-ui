import React, { ReactNode } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: "920px",
    maxWidth: "100%",
    marginBottom: "30px",
    [theme.breakpoints.up("lg")]: {
      marginLeft: "-45px",
      marginBottom: "50px",
    },
    [theme.breakpoints.up("md")]: {
      marginLeft: "-25px",
    },
    [theme.breakpoints.up("sm")]: {
      marginLeft: "-10px",
      marginBottom: "40px",
      flexDirection: "row",
      alignItems: "center",
    },
  },
  rightSection: {
    flexGrow: 1,
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "-10px",
      marginBottom: "40px",
      flexDirection: "row",
    },
  },
  number: {
    marginBottom: "10px",
    display: "flex",
    flexWrap: "nowrap",
    alignItems: "flex-end",
    fontFamily: "'Comfortaa', cursive",
    [theme.breakpoints.up("lg")]: {
      paddingRight: "30px",
    },
    [theme.breakpoints.up("sm")]: {
      marginBottom: 0,
      width: "90px",
      paddingRight: "20px",
      justifyContent: "flex-end",
      alignItems: "center",
    },
  },
  numText: {
    fontSize: "48px",
    lineHeight: "48px",
    color: theme.palette.primary.main,
    [theme.breakpoints.up("md")]: {
      fontSize: "96px",
      lineHeight: "96px",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "86px",
      lineHeight: "86px",
      color: "#D2D8E6",
    },
  },
  alternativeTitle: {
    marginLeft: "5px",
    fontSize: "30px",
    lineHeight: "30px",
    fontFamily: "'Comfortaa', cursive",
    color: "#A3A3A3",
  },
  image: {
    width: "100%",
  },
  imageContainer: {
    flexShrink: 0,
    width: "180px",
    [theme.breakpoints.up("lg")]: {
      width: "220px",
    },
    [theme.breakpoints.up("md")]: {
      width: "200px",
    },
  },
  textBlock: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    flexShrink: 1,
    fontSize: "20px",
    lineHeight: "30px",
    [theme.breakpoints.up("lg")]: {
      fontSize: "28px",
      lineHeight: "34px",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "24px",
      lineHeight: "32px",
    },
    [theme.breakpoints.up("sm")]: {
      backgroundImage:
        "linear-gradient(90deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 101.98%)",
      paddingLeft: "30px",
    },
  },
}));

type Props = {
  num: number;
  text: ReactNode;
  image: string;
  title: ReactNode;
};

const StepBlock = ({ num, image, text, title }: Props) => {
  const classes = useStyles();
  return (
    <Grid container wrap="nowrap" className={classes.root}>
      <Grid item container className={classes.number}>
        <Typography className={classes.numText}>{num}.</Typography>
        <Hidden smUp implementation="css">
          <Typography className={classes.alternativeTitle}>{title}</Typography>
        </Hidden>
      </Grid>
      <Grid item container wrap="nowrap" className={classes.rightSection}>
        <Hidden xsDown implementation="css">
          <Grid item className={classes.imageContainer}>
            <img src={image} className={classes.image} />
          </Grid>
        </Hidden>
        <Grid item className={classes.textBlock}>
          {text}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default StepBlock;
