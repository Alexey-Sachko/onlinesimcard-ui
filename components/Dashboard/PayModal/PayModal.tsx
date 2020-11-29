import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import CachedIcon from "@material-ui/icons/Cached";
import { gql } from "@apollo/client";

import rubleIcon from "./ruble-icon.svg";
import { OrderStatus, useMyOrdersQuery } from "../../../lib/types";

export const MY_ORDERS_QUERY = gql`
  query MyOrders {
    myOrders {
      id
      paymentId
      amount
      status
      createdAt
    }
  }
`;

const orderStatusMap: Record<OrderStatus, string> = {
  ERROR: "ошибка",
  PAID: "оплачен",
  WAIT_PAY: "в обработке",
};

export type OnPayProps = { amount: number };

export type PayModalProps = {
  open: boolean;
  onClose: () => void;
  onPay?: (props: OnPayProps) => void | Promise<void>;
};

const PayModal = ({ open, onClose, onPay }: PayModalProps) => {
  const { data, refetch } = useMyOrdersQuery();
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

        <Box mt={3}>
          <Typography variant="h6">
            История заказов:{" "}
            <IconButton onClick={() => refetch()}>
              <CachedIcon />
            </IconButton>
          </Typography>
        </Box>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>Дата</TableCell>
              <TableCell>Сумма</TableCell>
              <TableCell>Статус</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.myOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString()}{" "}
                  {new Date(order.createdAt).toLocaleTimeString()}
                </TableCell>
                <TableCell>{order.amount} р.</TableCell>
                <TableCell>{orderStatusMap[order.status]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
