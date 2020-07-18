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
            transition: background ${theme.transition.hover};
          }
          .container:last-child {
            border: none;
            border-radius: 0 5px 5px 0;
          }
          .container:first-child {
            border-radius: 5px 0 0 5px;
          }

          @media (max-width: 1024px) {
            .container {
              border: none;
              border-bottom: 1px solid ${theme.colors.blueBackground};
              padding: 15px 35px;
            }
            .container:last-child {
              border-radius: 0 0 5px 5px;
            }
            .container:first-child {
              border-radius: 5px 5px 0 0;
            }
          }
          @media (max-width: 768px) {
            .country-label {
              white-space: nowrap;
            }
          }

          @media (max-width: 576px) {
            .container {
              border: none;
              border-right: 1px solid ${theme.colors.blueBackground};
              padding: 10px 0;
            }
            .container:last-child {
              border: none;
              border-radius: 0 5px 5px 0;
            }
            .container:first-child {
              border-radius: 5px 0 0 5px;
            }
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
        <div className="country-label">
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
