import React from "react";
import { Chip, Menu, MenuItem } from "@material-ui/core";

export type BalanceProps = {
  amount: number | undefined;
  onPay?: () => void;
};

const Balance = ({ amount, onPay }: BalanceProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePay = () => {
    onPay && onPay();
    handleClose();
  };

  return (
    <>
      <Chip
        color="primary"
        size="small"
        onClick={handleClick}
        label={<>{amount} ₽</>}
      />
      <Menu
        id="balance-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        getContentAnchorEl={null} //https://github.com/mui-org/material-ui/issues/7961
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MenuItem disabled>Баланс: {amount} ₽</MenuItem>
        <MenuItem onClick={handlePay}>Пополнить</MenuItem>
      </Menu>
    </>
  );
};

export default Balance;
