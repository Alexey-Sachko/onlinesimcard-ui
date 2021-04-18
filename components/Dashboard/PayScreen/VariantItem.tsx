import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";

const VariantItem = ({
  comission,
  name,
  imgUrl,
  active,
  onClick,
}: {
  name: string;
  comission: string;
  imgUrl: string;
  active: boolean;
  onClick: () => void;
}) => {
  const classes = useVariantItemStyles();

  return (
    <div
      onClick={onClick}
      className={clsx(classes.kassaBox, {
        [classes.active]: active,
      })}
    >
      <div className={classes.kassaImgWrap}>
        <img src={imgUrl} />
      </div>
      <div>
        <Typography variant="h6" className={classes.title}>
          {name} <Typography variant="caption">({comission})</Typography>
        </Typography>
      </div>
    </div>
  );
};

export default VariantItem;

const useVariantItemStyles = makeStyles((theme) => ({
  title: {
    fontSize: "16px",
  },
  kassaBox: {
    paddingTop: "10px",
    paddingBottom: "10px",
    width: "250px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    border: "2px solid #ddd",
    cursor: "pointer",
  },
  kassaImgWrap: {
    width: "150px",
    "& img": {
      width: "100%",
    },
  },
  active: {
    border: `2px solid ${theme.palette.success.main}`,
  },
}));
