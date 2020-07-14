import React, { ComponentProps } from "react";
import settings from "./settings";
import { theme } from "../../../theme/customTheme";

type Props = {
  variant?: keyof typeof settings;
  className?: string;
  color?: keyof typeof theme["colors"];
  align?: "left" | "center" | "right";
} & ComponentProps<"div">;

const Typography: React.FC<Props> = ({
  children,
  variant,
  className,
  color,
  align,
  ...props
}) => {
  if (!variant) {
    return (
      <span className={className ? className : ""} {...props}>
        {children}
      </span>
    );
  }

  const settingsItem = settings[variant];

  if (!settingsItem) {
    return (
      <span className={className ? className : ""} {...props}>
        {children}
      </span>
    );
  }

  return (
    <>
      <style jsx>{`
        .typography {
          font-family: ${settingsItem.fontFamily};
          font-size: ${settingsItem.fontSize};
          font-weight: ${settingsItem.fontWeight};
          line-height: ${settingsItem.lineHeight};
          color: ${color ? theme.colors[color] : theme.colors.jetBasic};
          text-align: ${align ? align : "initial"};
        }
      `}</style>

      <span className={`typography ${className ? className : ""}`} {...props}>
        {children}
      </span>
    </>
  );
};

export default Typography;
