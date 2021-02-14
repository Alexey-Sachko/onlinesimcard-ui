import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
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
import { Alert } from "@material-ui/lab";
import CachedIcon from "@material-ui/icons/Cached";
import { gql } from "@apollo/client";

import freeKassaLogo from "./free-kassa.png";
import cardLogo from "./card.png";
import rubleIcon from "./ruble-icon.svg";
import {
  OrderStatus,
  PaymentVariant,
  useMyOrdersQuery,
} from "../../../lib/types";
import VariantItem from "./VariantItem";

export const MY_ORDERS_QUERY = gql`
  query MyOrders {
    myOrders {
      id
      paymentId
      amount
      status
      createdAt
      formVariant
    }
  }
`;

const orderStatusMap: Record<OrderStatus, string> = {
  ERROR: "ошибка",
  PAID: "оплачен",
  WAIT_PAY: "в обработке",
};

export type OnPayProps = { amount: number; variant: PaymentVariant };

export type PayModalProps = {
  open: boolean;
  onClose: () => void;
  onPay?: (props: OnPayProps) => void | Promise<void>;
};

const formVariantText: Record<PaymentVariant, string> = {
  [PaymentVariant.BankCard]: "Банковская карта",
  [PaymentVariant.Freekassa]: "FreeKassa",
};

const factorMap: Record<PaymentVariant, number> = {
  [PaymentVariant.BankCard]: 1.02,
  [PaymentVariant.Freekassa]: 1.1,
};

const PayModal = ({ open, onClose, onPay }: PayModalProps) => {
  const { data, refetch } = useMyOrdersQuery();
  const classes = useStyles();
  const [amount, setAmount] = React.useState(100);
  const [variant, setVariant] = React.useState(PaymentVariant.BankCard);

  const payHandler = async () => {
    onPay && (await onPay({ amount, variant }));
    onClose();
  };

  const sumWithComission = Math.round(amount * factorMap[variant] * 100) / 100;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Оплата</DialogTitle>
      <DialogContent dividers>
        <Box mb={2}>
          <Typography>Выберите способ оплаты:</Typography>
        </Box>

        <Grid container className={classes.variants} spacing={3}>
          <Grid item>
            <VariantItem
              name={"Банковская карта"}
              comission={"~2%"}
              imgUrl={cardLogo}
              active={variant === PaymentVariant.BankCard}
              onClick={() => setVariant(PaymentVariant.BankCard)}
            />
          </Grid>
          <Grid item>
            <VariantItem
              name={"FreeKassa"}
              comission={"~10%"}
              imgUrl={freeKassaLogo}
              active={variant === PaymentVariant.Freekassa}
              onClick={() => setVariant(PaymentVariant.Freekassa)}
            />
          </Grid>
        </Grid>

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
            value={sumWithComission}
            InputProps={{
              endAdornment: <img src={rubleIcon} width="12" height="12" />,
            }}
          />
        </div>

        <Alert severity="warning">Минимальная сумма оплаты - 10р</Alert>

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
            <IconButton onClick={() => refetch?.()}>
              <CachedIcon />
            </IconButton>
          </Typography>
        </Box>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>Дата</TableCell>
              <TableCell>Форма</TableCell>
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
                <TableCell>{formVariantText[order.formVariant]}</TableCell>
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
  variants: {
    marginBottom: "25px",
  },
  payBtn: {
    marginTop: "20px",
  },
}));
