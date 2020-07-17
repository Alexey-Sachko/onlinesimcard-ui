import React from "react";

import Typography from "../../../layout/Typography";
import CopyIcon from "../../../icons/CopyIcon";
import MessageIcon from "../../../icons/MessageIcon";
import { theme } from "../../../../theme/customTheme";

type Props = {
  number: string | number;
  full_number: string;
  selected: boolean;
  onSelectNumber: (number: string | number) => void;
  setIsShowNotify: SetUseState<boolean>;
};

export type SetUseState<T> = (value: T | ((prevVal: T) => T)) => void;

const NumberItem: React.FC<Props> = ({
  number,
  full_number,
  selected,
  onSelectNumber,
  setIsShowNotify,
}) => {
  const onClickNumber = () => {
    onSelectNumber(number);
  };

  const onCopyNumber = () => {
    navigator.clipboard.writeText(full_number);
    setIsShowNotify(true);
    setTimeout(() => {
      setIsShowNotify(false);
    }, 3000);
  };

  return (
    <div className="container" onClick={onClickNumber}>
      <style jsx>
        {`
          .container {
            padding: 17px 20px;
            display: flex;
            align-items: center;
            border-bottom: 1px solid ${theme.colors.jetExtraLight};
            transition: background 0.15s ease;
          }
          .container:last-child {
            border-bottom: none;
            border-radius: 0 0 5px 5px;
          }
          .container:first-child {
            border-radius: 5px 5px 0 0;
          }
          .number-icon {
            display: flex;
            align-items: center;
          }
          .number-body {
            margin: auto 0 auto 15px;
          }
          .copy-number-icon {
            display: flex;
            align-items: center;
            margin-left: auto;
            cursor: pointer;
          }
          .copy-number-icon,
          .number-icon {
            width: 22px;
          }
        `}
      </style>
      <style jsx>
        {`
          .container {
            background: ${selected ? theme.colors.jetExtraLight : "initial"};
            cursor: ${selected ? "initial" : "pointer"};
          }
          .container:hover {
            background: ${selected ? theme.colors.jetExtraLight : "#f0f0f0"};
          }
          .number-text {
            color: ${selected ? theme.colors.blueBasic : "initial"};
          }
        `}
      </style>
      <div className="number-icon">
        <MessageIcon color={selected ? "blueBasic" : "jetBasic"} />
      </div>
      <div className="number-body">
        <Typography
          color={selected ? "blueBasic" : "jetBasic"}
          variant="usualParagraph"
        >
          {full_number}
        </Typography>
      </div>
      <div onClick={onCopyNumber} className="copy-number-icon">
        <CopyIcon color={selected ? "blueBasic" : "jetLight"} />
      </div>
    </div>
  );
};

export default NumberItem;
