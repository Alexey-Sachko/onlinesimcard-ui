import React from "react";

import { themeBasic } from "../../../theme/customTheme";
import { useTheme } from "../../hooks/useTheme";
import Typography from "../../layout/Typography";
import { hexToRgb } from "../../../helpers/helpers";

type Props = {
  checked: boolean;
  onChange: (value: boolean) => void;
  color?: keyof typeof themeBasic["colors"];
  hoverColor?: keyof typeof themeBasic["colors"];
  variant?: keyof typeof sizeCheckbox;
  label?: string;
};

const Checkbox: React.FC<Props> = ({
  color,
  hoverColor,
  checked,
  onChange,
  variant = "small",
  label,
}) => {
  const theme = useTheme();
  const checkboxSetting = sizeCheckbox[variant];
  const selectedColor = themeBasic.colors[color];
  const selectedHoverColor = themeBasic.colors[hoverColor];

  return (
    <>
      <style jsx>
        {`
          /* Customize the label (the container) */
          .container {
            display: block;
            position: relative;
            padding-left: 35px;
            margin-bottom: 12px;
            cursor: pointer;
            font-size: 22px;
            width: max-content;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }

          /* Hide the browser's default checkbox */
          .container input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
          }

          /* Create a custom checkbox */
          .checkmark {
            position: absolute;
            top: -1px;
            left: 0;
            height: ${checkboxSetting.height};
            width: ${checkboxSetting.width};
            background-color: #fff;
            border-radius: 5px;
            transition: all ${theme.transition.hover};
            border: 2px solid ${selectedColor};
          }

          /* On mouse-over, add a grey background color */
          .container:hover input ~ .checkmark {
            background: ${selectedHoverColor};
            box-shadow: ${theme.shadows.usualShadow};
          }

          /* When the checkbox is checked, add a blue background */
          .container input:checked ~ .checkmark {
            background-color: ${selectedColor};
          }

          /* Create the checkmark/indicator (hidden when not checked) */
          .checkmark:after {
            content: "";
            position: absolute;
            display: none;
          }

          /* Show the checkmark when checked */
          .container input:checked ~ .checkmark:after {
            display: block;
          }

          /* Style the checkmark/indicator */
          .container .checkmark:after {
            left: ${checkboxSetting.left};
            top: ${checkboxSetting.top};
            width: ${checkboxSetting.widthCheckmark};
            height: ${checkboxSetting.heightCheckmark};
            border: solid white;
            border-width: 0 2px 2px 0;
            -webkit-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            transform: rotate(45deg);
          }
          .checkbox-label {
            margin-left: 5px;
          }
        `}
      </style>
      <label className="container">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="checkmark"></span>
        <Typography variant="usualParagraph" color="jetMedium">
          <span className="checkbox-label">{label}</span>
        </Typography>
      </label>
    </>
  );
};

const sizeCheckbox = {
  small: {
    width: "15px",
    height: "15px",
    left: "4px",
    top: "0px",
    widthCheckmark: "5px",
    heightCheckmark: "10px",
  },
  medium: {
    width: "21px",
    height: "21px",
    left: "6px",
    top: "0px",
    widthCheckmark: "7px",
    heightCheckmark: "14px",
  },
  xl: {
    width: "30px",
    height: "30px",
    left: "9px",
    top: "2px",
    widthCheckmark: "9px",
    heightCheckmark: "18px",
  },
};

export default Checkbox;
