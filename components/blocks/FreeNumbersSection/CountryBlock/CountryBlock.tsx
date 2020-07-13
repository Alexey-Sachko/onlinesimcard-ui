import React from "react";

import Typography from "../../../layout/Typography";
import { theme } from "../../../../theme/customTheme";

type Props = {
  image: string;
  label: string;
  selected: boolean;
  code: number;
  onSelectCountry: (code: number) => void;
};

const CountryBlock: React.FC<Props> = ({
  image,
  label,
  selected,
  onSelectCountry,
  code,
}) => {
  return (
    <div className="container" onClick={() => onSelectCountry(code)}>
      <style jsx>
        {`
          .container {
            padding: 20px 55px;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            text-align: center;
            border-right: 1px solid ${theme.colors.blueBackground};
            transition: background 0.15s ease;
          }
          .container:last-child {
            border: none;
            border-radius: 0 5px 5px 0;
          }
          .container:first-child {
            border-radius: 5px 0 0 5px;
          }
          .container img {
            width: 50px;
          }
          .container div {
            margin: auto;
          }
        `}
      </style>
      <style jsx>
        {`
          .container {
            background: ${selected
              ? theme.colors.blueLight
              : theme.colors.whiteBasic};
            cursor: ${selected ? "initial" : "pointer"};
          }
          .container:hover {
            background: ${selected ? theme.colors.blueLight : "#f0f0f0"};
          }
        `}
      </style>

      <div>
        <div>
          <img src={image} />
        </div>
        <div>
          <Typography
            color={selected ? "whiteBasic" : "jetLight"}
            variant="h5Regular"
          >
            {label}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default CountryBlock;
