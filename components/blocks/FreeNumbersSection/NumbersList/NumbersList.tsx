import React from "react";

import Typography from "../../../layout/Typography";
import IconButton from "../../../layout/IconButton";

import NumberItem from "../NumberItem";
import { theme } from "../../../../theme/customTheme";

type Props = {
  data: any;
  onSelectNumber: (number: string | number) => void;
  selectedNumber: number | string;
  onReloadNumbers: () => void;
};

const NumbersList: React.FC<Props> = ({
  data,
  onSelectNumber,
  selectedNumber,
  onReloadNumbers,
}) => {
  return (
    <>
      <style jsx>
        {`
          .reset-button-img {
            width: 100%;
          }
          .numbers-list-title {
            display: flex;
            margin-left: 20px;
          }
          .numbers-list-title span {
            letter-spacing: 1.5px;
            white-space: nowrap;
          }
          .reset-button-container {
            margin-left: 15px;
          }
          .numbers-container {
            margin-top: 25px;
            background: ${theme.colors.whiteBasic};
            border-radius: 5px;
            box-shadow: ${theme.shadows.usualShadow};
          }
        `}
      </style>
      <div className="numbers-list-title">
        <span>
          <Typography variant="h5">СПИСОК НОМЕРОВ</Typography>
        </span>
        <div className="reset-button-container">
          <IconButton onClick={onReloadNumbers}>
            <img
              className="reset-button-img"
              src="/static/reset-alternative.svg"
            />
          </IconButton>
        </div>
      </div>
      <div className="numbers-container">
        {data?.map(({ full_number, number }, idx) => (
          <NumberItem
            key={idx}
            onSelectNumber={onSelectNumber}
            full_number={full_number}
            number={number}
            selected={selectedNumber === number}
          />
        ))}
      </div>
    </>
  );
};

export default NumbersList;
