import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: "5px",
    backgroundColor: "#F2F2F2",
    color: "#4A4A4A",
  },
  head: {
    borderBottom: "2px solid #D6D6D6",
    padding: "10px",
    display: "flex",
    justifyContent: "center",
    fontSize: "32px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "24px",
    },
  },
  body: {
    flexGrow: 1,
    padding: "20px 20px 20px 34px",
  },
  price: {
    fontSize: "32px",
    color: "#FC7E2F",
    marginBottom: "20px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "24px",
    },
  },
  feature: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  featureText: {
    fontSize: "22px",
    fontWeight: 300,
    [theme.breakpoints.down("lg")]: {
      fontSize: "16px",
    },
  },
  listMark: {
    width: "10px",
    height: "10px",
    borderRadius: "10px",
    backgroundColor: "#1E71FF",
    marginRight: "15px",
  },
  footer: {
    width: "100%",
    fontSize: "20px",
    borderTopRightRadius: "0",
    borderTopLeftRadius: "0",
    [theme.breakpoints.down("lg")]: {
      fontSize: "16px",
    },
  },
}));

type Props = {
  title: React.ReactNode;
  price: React.ReactNode;
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
        <div className={classes.price}>{price}</div>
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
