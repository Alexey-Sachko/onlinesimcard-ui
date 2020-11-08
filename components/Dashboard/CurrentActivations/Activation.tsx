import React from "react";
import {
  Box,
  CircularProgress,
  Divider,
  IconButton,
  makeStyles,
  Paper,
  Tooltip,
  Typography,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { gql } from "@apollo/client";
import { useSnackbar } from "notistack";

import russiaIcon from "./russia.png";
import {
  ActivationStatus,
  DisplayActivationFragment,
} from "../../../lib/types";
import { toTimeString } from "./utils";
import CopyButton from "./CopyButton";
import { useServiceName } from "../Services/hooks";

export const DISPLAY_ACTIVATION_FRAGMENT = gql`
  fragment DisplayActivation on ActivationType {
    id
    status
    phoneNum
    cost
    expiresAt
    serviceCode
    activationCodes {
      code
      id
    }
  }
`;

type ActivationProps = {
  activation: DisplayActivationFragment;
  onCancel: (activationId: number) => Promise<void> | void;
  onFinish: (activationId: number) => Promise<void> | void;
};

const Activation = ({ activation, onCancel, onFinish }: ActivationProps) => {
  const classes = useStyles();
  const [expires, setExpires] = React.useState("");
  const serviceName = useServiceName(activation.serviceCode);
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    const interval = setInterval(() => {
      setExpires(toTimeString(activation.expiresAt));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const cancelHandler = () => {
    const minute = 1000 * 60;

    const activationTime = new Date(activation.expiresAt).getTime();
    const currentTime = new Date().getTime();

    if (
      [ActivationStatus.WaitAgain, ActivationStatus.WaitCode].includes(
        activation.status
      ) &&
      activationTime - minute * 18 > currentTime
    ) {
      enqueueSnackbar(
        "Активацию можно завершить только спустя 2 минуты или после приёма смс",
        { variant: "warning", autoHideDuration: 3000 }
      );
      return;
    }

    onCancel(activation.id);
  };

  const lastCode =
    activation.activationCodes?.[activation.activationCodes.length - 1];

  let actionsJSX: React.ReactNode = null;
  switch (activation.status) {
    case ActivationStatus.SendingConfirmed:
    case ActivationStatus.SmsRecieved:
      actionsJSX = (
        <Tooltip title="Закончить работу с номером" arrow>
          <IconButton
            size="small"
            className={classes.confirmBtn}
            onClick={() => onFinish(activation.id)}
          >
            <CheckCircleIcon />
          </IconButton>
        </Tooltip>
      );
      break;
    case ActivationStatus.WaitCode:
      actionsJSX = (
        <Tooltip title="Отменить" arrow>
          <IconButton
            size="small"
            className={classes.cancelBtn}
            onClick={cancelHandler}
          >
            <CancelIcon />
          </IconButton>
        </Tooltip>
      );
      break;
  }

  return (
    <Paper variant="outlined">
      <Box px={2} py={1} className={classes.contentBox}>
        <Box mr={1} width="25px">
          <img src={russiaIcon} style={{ width: "100%" }} />
        </Box>
        <Typography>{activation.phoneNum}</Typography>

        <Box ml={1} mr={1}>
          <CopyButton value={activation.phoneNum} />
        </Box>

        <Divider orientation="vertical" flexItem />

        <Box ml={1} mr={1} className={classes.serviceBox}>
          <Typography variant="caption" color="textSecondary">
            {serviceName}
          </Typography>
        </Box>

        <Divider orientation="vertical" flexItem />

        <Box ml={1} mr={1} className={classes.serviceBox}>
          <Typography variant="caption" color="textSecondary">
            {expires}
          </Typography>
        </Box>

        <Divider orientation="vertical" flexItem />

        <Box ml={1} className={classes.serviceBox}>
          <Typography variant="caption" color="textSecondary">
            Код:{" "}
          </Typography>
        </Box>

        <Box ml={1} className={classes.serviceBox}>
          {[
            ActivationStatus.SmsRecieved,
            ActivationStatus.WaitAgain,
            ActivationStatus.SendingConfirmed,
          ].includes(activation.status) ? (
            <Box className={classes.codeBox}>
              <Box mr={1}>
                <Typography key={lastCode.id} variant="caption">
                  {lastCode.code}
                </Typography>
              </Box>
              <CopyButton value={lastCode.code} />
            </Box>
          ) : (
            <CircularProgress className={classes.progress} size={15} />
          )}
        </Box>

        <Box flexGrow="1" display="flex" justifyContent="flex-end">
          {actionsJSX}
        </Box>
      </Box>
    </Paper>
  );
};

export default Activation;

const useStyles = makeStyles((theme) => ({
  contentBox: {
    display: "flex",
  },
  serviceBox: {
    paddingTop: "3px",
  },
  cancelBtn: {
    color: theme.palette.error.main,
  },
  confirmBtn: {
    color: theme.palette.success.main,
  },
  progress: {
    marginTop: "3px",
  },
  codeBox: {
    display: "flex",
    alignItems: "center",
    marginTop: "-2px",
  },
}));
