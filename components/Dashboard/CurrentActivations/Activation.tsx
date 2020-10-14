import React, { useEffect } from "react";
import {
  Box,
  Divider,
  IconButton,
  makeStyles,
  Paper,
  Tooltip,
  Typography,
} from "@material-ui/core";
import SmsIcon from "@material-ui/icons/Sms";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import CancelIcon from "@material-ui/icons/Cancel";
import DoneIcon from "@material-ui/icons/Done";
import { gql } from "@apollo/client";

import russiaIcon from "./russia.png";
import { DisplayActivationFragment } from "../../../lib/types";
import { toTimeString } from "./utils";

export const DISPLAY_ACTIVATION_FRAGMENT = gql`
  fragment DisplayActivation on ActivationType {
    id
    status
    phoneNum
    cost
    expiresAt
  }
`;

type ActivationProps = {
  activation: DisplayActivationFragment;
  onCancel: (activationId: number) => Promise<void> | void;
};

const Activation = ({ activation, onCancel }: ActivationProps) => {
  const classes = useStyles();
  const [expires, setExpires] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setExpires(toTimeString(activation.expiresAt));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const copyNumHandler = () => {
    navigator.clipboard.writeText(activation.phoneNum);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <Paper variant="outlined">
      <Box px={2} py={1} className={classes.contentBox}>
        <Box mr={2}>
          <SmsIcon color="primary" />
        </Box>
        <Typography>{activation.phoneNum}</Typography>

        <Box ml={1} mr={2}>
          {copied ? (
            <DoneIcon
              color="primary"
              className={classes.doneIcon}
              style={{ width: "15px" }}
            />
          ) : (
            <FileCopyIcon
              onClick={copyNumHandler}
              color="action"
              style={{ width: "15px", cursor: "pointer" }}
            />
          )}
        </Box>

        <Divider orientation="vertical" flexItem />

        <Box ml={2} mr={2} className={classes.serviceBox}>
          <Typography variant="caption" color="textSecondary">
            Вконтакте
          </Typography>
        </Box>

        <Divider orientation="vertical" flexItem />

        <Box ml={2} mr={2} className={classes.serviceBox}>
          <Typography variant="caption" color="textSecondary">
            {expires}
          </Typography>
        </Box>

        <Divider orientation="vertical" flexItem />

        <Box ml={2} width="25px">
          <img src={russiaIcon} style={{ width: "100%" }} />
        </Box>

        <Box flexGrow="1" display="flex" justifyContent="flex-end">
          <Tooltip title="Отменить" arrow>
            <IconButton
              size="small"
              className={classes.cancelBtn}
              onClick={() => onCancel(activation.id)}
            >
              <CancelIcon />
            </IconButton>
          </Tooltip>
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
  doneIcon: {
    color: theme.palette.success.main,
  },
}));
