import React, { ComponentProps } from "react";

import { useTheme } from "../../hooks/useTheme";

type Props = {
  className?: string;
} & ComponentProps<"button">;

const IconButton: React.FC<Props> = ({ children, className, ...props }) => {
  const theme = useTheme();
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
            background: inherit;
            transition: box-shadow ${theme.transition.hover};
          }
          .button:hover {
            box-shadow: ${theme.shadows.bigShadow};
          }
          .button:focus {
            outline: none;
          }
          @media (max-width: 768px) {
            .button {
              margin-top: -2px;
              width: 25px;
              height: 25px;
              padding: 2px;
            }
          }
          @media (max-width: 576px) {
            .button {
              margin-top: 0;
              width: 25px;
              height: 25px;
              padding: 2px;
            }
          }
        `}
      </style>
      {children}
    </button>
  );
};

export default IconButton;
