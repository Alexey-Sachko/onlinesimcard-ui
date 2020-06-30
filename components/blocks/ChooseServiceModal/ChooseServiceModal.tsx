import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { services } from "../../../data/services";

type Props = {
  open: boolean;
  onClose?: () => void;
};

const ICON_SIZE = 16;

const useStyles = makeStyles((theme) => ({
  socialIcon: {
    background: "url(/static/socials-sprite.png)",
    width: "16px",
    height: "16px",
  },
  socialIconWrapper: {
    minWidth: "30px",
  },
}));

const ChooseServiceModal = ({ open, onClose }: Props) => {
  const classes = useStyles();
  return (
    <Dialog open={open} maxWidth="sm" fullWidth onClose={onClose}>
      <DialogTitle>Выберите сервис</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>Some text</DialogContentText> */}
        <List>
          {services.map(({ name, x, y }, idx) => (
            <ListItem key={idx} button onClick={onClose} divider>
              <ListItemIcon className={classes.socialIconWrapper}>
                <div
                  className={classes.socialIcon}
                  style={{
                    backgroundPositionX: x * -1 * ICON_SIZE,
                    backgroundPositionY: y * -1 * ICON_SIZE,
                  }}
                />
              </ListItemIcon>
              <ListItemText>{name}</ListItemText>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChooseServiceModal;
