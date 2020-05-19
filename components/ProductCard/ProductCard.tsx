import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Button, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    // minWidth: "500px",
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
  },
  body: {
    padding: "20px 20px 20px 34px",
  },
  price: {
    fontSize: "32px",
    color: "#FC7E2F",
    marginBottom: "20px",
  },
  feature: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  featureText: {
    fontSize: "22px",
    fontWeight: 300,
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
