import React, { useMemo } from "react";
import {
  ButtonDefault,
  ButtonPrimaryContained,
  ButtonPrimaryDefault,
  ButtonPrimaryOutlined,
} from "./Button.styled";
import { ButtonColor, ButtonSize, ButtonVariant } from "./types";

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
};

const btnMap = {
  contained_primary: ButtonPrimaryContained,
  outlined_primary: ButtonPrimaryOutlined,
  default_primary: ButtonPrimaryDefault,
  default: ButtonDefault,
};

export const Button = ({
  variant = "default",
  color = "default",
  size = "medium",
  ...props
}: ButtonProps) => {
  const ComponentBtn = useMemo(() => {
    return btnMap[`${variant}_${color}`] || btnMap.default;
  }, []);

  return <ComponentBtn {...props} size={size} />;
};
