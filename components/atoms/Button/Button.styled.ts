import styled, { css } from "styled-components";
import { breakpoints } from "../../MainPage/breakboints";
import { ButtonSize } from "./types";

const primaryCol = "#f74874";
const whiteCol = "#fff";
const greyCol = "#ccc";
const blackCol = "#232628";

export type ButtonBaseProps = {
  size: ButtonSize;
};

export const ButtonBase = styled.button`
  ${getSizeStyles};
  border-radius: 6px;
  border: 1px solid ${greyCol};
  font-family: Inter, sans-serif;
  font-weight: 500;
  font-size: 18px;
  outline: none;
  cursor: pointer;

  &:active {
    opacity: 0.9;
  }
`;

export const ButtonPrimaryContained = styled(ButtonBase)`
  background: ${primaryCol};
  border-color: ${primaryCol};
  color: ${whiteCol};
`;

export const ButtonPrimaryOutlined = styled(ButtonBase)`
  background: ${whiteCol};
  border-color: ${primaryCol};
  color: ${primaryCol};
`;

export const ButtonDefault = styled(ButtonBase)`
  background: ${whiteCol};
  border-color: ${whiteCol};
  color: ${blackCol};
`;

export const ButtonPrimaryDefault = styled(ButtonDefault)`
  color: ${primaryCol};
`;

function getSizeStyles(p: ButtonBaseProps) {
  switch (p.size) {
    case "medium":
      return css`
        padding: 8px 25px;
        min-width: 100px;

        @media (max-width: ${breakpoints.lg}px) {
          padding: 6px 20px;
          min-width: 60px;
          font-size: 15px;
        }
      `;
    case "big":
      return css`
        padding: 12px 25px;
        min-width: 300px;

        @media (max-width: ${breakpoints.lg}px) {
          padding: 10px 15px;
          min-width: 250px;
          font-size: 16px;
        }
      `;
  }
}
