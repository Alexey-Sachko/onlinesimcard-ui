import React, { ComponentProps } from "react";

import { theme } from "../../../theme/customTheme";

type Props = {
  className?: string;
} & ComponentProps<"button">;

const IconButton: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <button className={`button ${className ? className : ""}`} {...props}>
      <style jsx>
        {`
          .button {
            margin-top: -5px;
            border: 1px solid ${theme.colors.jetLight};
            border-radius: 50%;
            width: 32px;
            height: 32px;
            padding: 3px;
            cursor: pointer;
          }
          .button:hover {
            box-shadow: ${theme.shadows.bigShadow};
          }
          .button:focus {
            outline: none;
          }
        `}
      </style>
      {children}
    </button>
  );
};

export default IconButton;
