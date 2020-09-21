import React, { ReactNode } from "react";

import { useTheme } from "../../hooks/useTheme";
import { themeBasic } from "../../../theme/customTheme";

type Props = {
  onClick: () => void;
  color?: keyof typeof themeBasic["colors"];
  hoverColor?: keyof typeof themeBasic["colors"];
  outline?: boolean;
  text?: string;
  icon?: ReactNode;
  justify?: "flex-start" | "center" | "flex-end";
};

const Button: React.FC<Props> = ({
  onClick,
  color,
  hoverColor,
  outline,
  text,
  icon,
  justify = "center",
}) => {
  const theme = useTheme();
  const selectedColor = theme.colors[color || "mangoBasic"];
  const selectedHoverColor = theme.colors[hoverColor || "mangoHard"];

  return (
    <>
      <style jsx>
        {`
          .button {
            border-radius: 5px;
            width: 100%;
            display: flex;
            align-items: center;
          }
        `}
      </style>
      <style jsx>{`
        .button {
          background: ${outline ? "inherit" : selectedColor};
          border: ${outline ? `3px solid ${selectedColor}` : "none"};
          color: ${outline ? selectedColor : "#fff"} !important;
          transition: all ${theme.transition.hover};
          padding: ${outline ? "9px 20px 9px 20px" : "12px 20px 12px 20px"};
          justify-content: ${justify};
        }
        .button:hover {
          background: ${outline ? selectedColor : selectedHoverColor};
          box-shadow: ${theme.shadows.bigShadow};
        }
        .button .button-text {
          color: ${outline ? selectedColor : "#fff"} !important;
          font-size: 22.5px;
          font-weight: 600;
          line-height: 28px;
        }

        .button:hover .button-text {
          color: ${outline ? "#fff" : "#fff"} !important;
        }

        @media (max-width: 1440px) {
          .button {
            padding: ${outline ? "7px 10px 7px 10px" : "10px 10px 10px 10px"};
          }
        }

        @media (max-width: 1024px) {
          .button .button-text {
            font-size: 18px;
            font-weight: 600;
            line-height: 22px;
          }
        }

        @media (max-width: 768px) {
          .button {
            justify-content: center;
          }
        }
      `}</style>

      <button className="button" onClick={onClick}>
        {icon}
        <span className="button-text">{text}</span>
      </button>
    </>
  );
};

export default Button;
