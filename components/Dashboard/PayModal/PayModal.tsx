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

import rubleIcon from "./ruble-icon.svg";

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
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Оплата</DialogTitle>
      <DialogContent dividers>
        <div className={classes.kassaBox}>
          <img src="https://www.free-kassa.ru/banner/logomail.png" />
        </div>
        <div>
          <TextField
            label="Сумма"
            variant="outlined"
            size="small"
            className={classes.field}
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
            InputProps={{
              endAdornment: <img src={rubleIcon} width="12" height="12" />,
            }}
          />
        </div>
        <div>
          <TextField
            label="Сумма с комиссией"
            variant="outlined"
            size="small"
            className={classes.field}
            value={Math.round(amount * 1.1 * 100) / 100}
            InputProps={{
              endAdornment: <img src={rubleIcon} width="12" height="12" />,
            }}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={payHandler}
          className={classes.payBtn}
        >
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
    marginBottom: "30px",
  },
  kassaBox: {
    marginBottom: "10px",
    width: "250px",
    "& img": {
      width: "100%",
    },
  },
  payBtn: {
    marginTop: "5px",
  },
}));
