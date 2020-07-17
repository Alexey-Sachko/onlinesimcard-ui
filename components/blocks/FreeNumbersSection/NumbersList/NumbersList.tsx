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
  setIsShowNotify: SetUseState<boolean>;
};

export type SetUseState<T> = (value: T | ((prevVal: T) => T)) => void;

const NumbersList: React.FC<Props> = ({
  data,
  onSelectNumber,
  selectedNumber,
  onReloadNumbers,
  setIsShowNotify,
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
            margin-top: 1.5vw;
            background: ${theme.colors.whiteBasic};
            border-radius: 5px;
            box-shadow: ${theme.shadows.usualShadow};
          }

          @media (max-width: 576px) {
            .numbers-list-title {
              margin-top: 20px;
              align-items: center;
            }
            .numbers-container {
              margin-top: 10px;
            }
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
            setIsShowNotify={setIsShowNotify}
          />
        ))}
      </div>
    </>
  );
};

export default NumbersList;
