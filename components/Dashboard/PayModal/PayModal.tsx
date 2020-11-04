import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  TextField,
} from "@material-ui/core";

export type OnPayProps = { amount: number };

export type PayModalProps = {
  open: boolean;
  onClose: () => void;
  onPay?: (props: OnPayProps) => void | Promise<void>;
};

const PayModal = ({ open, onClose, onPay }: PayModalProps) => {
  const classes = useStyles();
  const [amount, setAmount] = React.useState(100);

  const payHandler = async () => {
    onPay && (await onPay({ amount }));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Оплата</DialogTitle>
      <DialogContent dividers>
        <div className={classes.kassaBox}>
          <img src="https://www.free-kassa.ru/banner/logomail.png" />
        </div>
        <TextField
          label="Сумма"
          variant="outlined"
          size="small"
          className={classes.field}
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
        />{" "}
        <TextField
          label="Сумма с комиссией"
          variant="outlined"
          size="small"
          className={classes.field}
          value={Math.round(amount * 1.1 * 100) / 100}
        />{" "}
        <Button variant="contained" color="primary" onClick={payHandler}>
          Оплатить
        </Button>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={onClose}>
          Отмена
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PayModal;

const useStyles = makeStyles(() => ({
  field: {
    width: "200px",
    marginBottom: "10px",
  },
  kassaBox: {
    marginBottom: "10px",
    width: "250px",
    "& img": {
      width: "100%",
    },
  },
}));
