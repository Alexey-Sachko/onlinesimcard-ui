import React from "react";

import { useTheme } from "../../../hooks/useTheme";
import prepareNumber from "../../../../helpers/prepareNumber";
import countryList from "../../../blocks/FreeNumbersSection/country-list";

type Props = {
  number: string | number;
  full_number: string;
  selected: boolean;
  onSelectNumber: (number: string | number) => void;
  setIsShowNotify: SetUseState<boolean>;
  country: number | null;
};

export type SetUseState<T> = (value: T | ((prevVal: T) => T)) => void;

const NumberItem: React.FC<Props> = ({
  number,
  full_number,
  selected,
  onSelectNumber,
  setIsShowNotify,
  country,
}) => {
  const theme = useTheme();
  const onClickNumber = () => {
    onSelectNumber(number);
  };

  const onCopyNumber = () => {
    navigator.clipboard.writeText(full_number);
    setIsShowNotify((prev) => !prev);
  };

  const countryItem = countryList[country] || countryList.default;

  return (
    <div className="container" onClick={onClickNumber}>
      <style jsx>
        {`
          .container {
            padding: 5px 20px;
            display: flex;
            align-items: center;
            transition: background-color ${theme.transition.hover};
          }
          .number-icon {
            display: flex;
            align-items: center;
          }
          .number-body {
            margin: auto 0 auto 15px;
            font-size: 16px;
            line-height: 19.36px;
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
            background: ${selected ? theme.colors.backgroundMedium : "#fff"};
            cursor: ${selected ? "initial" : "pointer"};
          }
          .container:hover {
            background: ${selected ? theme.colors.backgroundMedium : "#f0f0f0"};
          }
          .number-text {
            color: #000;
          }
        `}
      </style>
      <div className="number-icon">
        <img src="/static/telephone.svg" alt="telephone-ic" />
      </div>
      <div className="number-body">
        +{country}{" "}
        {prepareNumber(
          number.toString(),
          countryItem?.regexp,
          countryItem?.mask
        )}
      </div>
      <div onClick={onCopyNumber} className="copy-number-icon">
        <img src="/static/right-arrow.svg" alt="right-arrow" />
      </div>
    </div>
  );
};

export default NumberItem;
