import { Chip, createStyles, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";

import { ActivationStatus } from "../../../lib/types";

type StatusChipProps = {
  status: ActivationStatus;
};

const dictionary: Record<ActivationStatus, string> = {
  CANCELLED: "Отменён",
  FINISHED: "Завершён",
  WAIT_AGAIN: "Повт. ожидание",
  WAIT_CODE: "Ожидание",
  ERROR: "Ошибка",
  SMS_RECIEVED: "Смс получено",
};

const isIn = (s: ActivationStatus, sArr: ActivationStatus[]) =>
  sArr.includes(s);

const StatusChip = ({ status }: StatusChipProps) => {
  const classes = useStyles();

  const text = dictionary[status];
  return (
    <Chip
      className={clsx({
        [classes.success]: isIn(status, [
          ActivationStatus.Finished,
          ActivationStatus.SmsRecieved,
        ]),
        [classes.error]: isIn(status, [
          ActivationStatus.Error,
          ActivationStatus.Cancelled,
        ]),
        [classes.warning]: isIn(status, [
          ActivationStatus.WaitAgain,
          ActivationStatus.WaitCode,
        ]),
      })}
      label={text}
      size="small"
    />
  );
};

export default StatusChip;

const useStyles = makeStyles((theme) =>
  createStyles({
    success: {
      backgroundColor: theme.palette.success.light,
    },
    error: {
      backgroundColor: theme.palette.error.light,
    },
    warning: {
      backgroundColor: theme.palette.warning.light,
    },
  })
);
