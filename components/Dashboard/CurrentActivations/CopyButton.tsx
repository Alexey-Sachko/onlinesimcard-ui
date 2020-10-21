import React from "react";
import { makeStyles, Tooltip } from "@material-ui/core";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import DoneIcon from "@material-ui/icons/Done";

const useCopyStyles = makeStyles((theme) => ({
  doneIcon: {
    color: theme.palette.success.main,
  },
  progress: {
    marginTop: "3px",
  },
}));

const CopyButton = ({ value }: { value: string }) => {
  const classes = useCopyStyles();
  const [copied, setCopied] = React.useState(false);
  const copyHandler = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return copied ? (
    <DoneIcon
      color="primary"
      className={classes.doneIcon}
      style={{ width: "15px" }}
    />
  ) : (
    <Tooltip title="Скопировать" arrow>
      <FileCopyIcon
        onClick={copyHandler}
        color="action"
        style={{ width: "15px", cursor: "pointer" }}
      />
    </Tooltip>
  );
};

export default CopyButton;
