import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

type Props = {
  open: boolean;
  onClose?: () => void;
};

type Service = {
  name: string;
  x: number;
  y: number;
};

const ICON_SIZE = 16;

const services: Service[] = [
  {
    name: "Вкотакте",
    x: 0,
    y: 0,
  },
  {
    name: "Facebook",
    x: 1,
    y: 0,
  },
  {
    name: "Одноклассники",
    x: 2,
    y: 0,
  },
];

const useStyles = makeStyles((theme) => ({
  socialIcon: {
    background: "url(/static/socials-sprite.png)",
    width: "16px",
    height: "16px",
  },
}));

const ChooseServiceModal = ({ open, onClose }: Props) => {
  const classes = useStyles();
  return (
    <Dialog open={open} maxWidth="md" fullWidth onClose={onClose}>
      <DialogTitle>Выберите сервис</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>Some text</DialogContentText> */}
        <List>
          {services.map(({ name, x, y }, idx) => (
            <ListItem key={idx} button onClick={onClose}>
              <ListItemIcon>
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
