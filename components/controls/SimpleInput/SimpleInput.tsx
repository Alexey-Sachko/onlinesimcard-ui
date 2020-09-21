import React, {
  ComponentProps,
  ChangeEvent,
  useRef,
  useLayoutEffect,
} from "react";

import { useTheme } from "../../hooks/useTheme";

type Props = {
  value?: string;
  label?: string;
  error?: string;
  onChangeHandler: (value: string) => void;
} & ComponentProps<"input">;

const SimpleInput: React.FC<Props> = ({
  value,
  label,
  error,
  onChangeHandler,
  ...props
}) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChangeHandler?.(value);
  };

  const theme = useTheme();

  return (
    <>
      <style jsx>
        {`
          .input {
            border: 0;
            padding: 4px 0;
            border-bottom: 2px solid ${theme.colors.jetExtraLight};
            background-color: transparent;
            width: 100%;
            font-family: ${theme.fonts.bodyFontFamily};
            font-weight: bold;
            font-size: 22.5px;
            line-height: 28px;
          }
          .input ~ .focus-border {
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 0;
            height: 2px;
            background-color: ${error
              ? theme.colors.redBasic
              : theme.colors.blueBasic};
            transition: 0.4s;
          }
          .input:focus ~ .focus-border,
          .has-content.input ~ .focus-border {
            width: 100%;
            transition: 0.4s;
            left: 0;
          }
          .input ~ label {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            color: ${theme.colors.jetLight};
            font-family: ${theme.fonts.bodyFontFamily};
            transition: 0.3s;
            z-index: -1;
            letter-spacing: 0.5px;
            font-weight: bold;
            font-size: 22.5px;
            line-height: 28px;
          }
          .input:focus ~ label,
          .has-content.input ~ label {
            top: -19px;
            transition: 0.3s;
            font-weight: normal;
            font-size: 14.4px;
            line-height: 18px;
          }
          .input-effect {
            position: relative;
          }

          @media (max-width: 768px) {
            .input,
            .input ~ label {
              font-size: 18px;
              line-height: 22px;
            }
          }
        `}
      </style>
      <div className="input-effect">
        <input
          onChange={onChange}
          value={value}
          className={`input ${value ? "has-content" : ""}`}
          {...props}
        />
        <label>{label}</label>
        <span className="focus-border"></span>
      </div>
    </>
  );
};

export default SimpleInput;
