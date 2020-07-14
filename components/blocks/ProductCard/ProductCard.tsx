import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import Typography from "../../layout/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "450px",
    maxWidth: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: "5px",
    backgroundColor: "#F2F2F2",
    color: "#4A4A4A",
    [theme.breakpoints.down("lg")]: {
      width: "100%",
    },
  },
  head: {
    borderBottom: "2px solid #D6D6D6",
    padding: "10px",
    display: "flex",
    justifyContent: "center",
    fontSize: "26px",
    fontFamily: "'Comfortaa', cursive",
    [theme.breakpoints.down("lg")]: {
      fontSize: "24px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
    },
  },
  body: {
    flexGrow: 1,
    padding: "20px 20px 20px 34px",
  },
  price: {
    fontSize: "24px",
    color: "#FC7E2F",
    marginBottom: "20px",
    [theme.breakpoints.down("md")]: {
      fontSize: "22px",
    },
  },
  feature: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  featureText: {
    fontSize: "18px",
    [theme.breakpoints.down("md")]: {
      fontSize: "16px",
    },
  },
  listMark: {
    flexShrink: 0,
    width: "10px",
    height: "10px",
    borderRadius: "10px",
    backgroundColor: "#1E71FF",
    marginRight: "15px",
  },
  footer: {
    width: "100%",
    fontSize: "25px",
    fontWeight: 400,
    textTransform: "none",
    borderTopRightRadius: "0",
    borderTopLeftRadius: "0",
    [theme.breakpoints.down("md")]: {
      fontSize: "24px",
    },
  },
}));

type Props = {
  title: React.ReactNode;
  price?: React.ReactNode;
  features: React.ReactNode[];
  onActionClick?: () => void;
};

const ProductCard = ({ title, price, features, onActionClick }: Props) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Typography className={classes.head} variant="h3">
        {title}
      </Typography>
      <div className={classes.body}>
        {price && <div className={classes.price}>{price}</div>}

        {features.map((feature, idx) => (
          <div key={idx} className={classes.feature}>
            <div className={classes.listMark} />
            <Typography className={classes.featureText}>{feature}</Typography>
          </div>
        ))}
      </div>
      <Button
        onClick={onActionClick}
        color="primary"
        variant="contained"
        className={classes.footer}
      >
        Получить номер
      </Button>
    </Paper>
  );
};

export default ProductCard;
