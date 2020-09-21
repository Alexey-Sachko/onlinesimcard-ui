import { CSSProperties } from "react";
import { themeBasic as theme } from "../../../theme/customTheme";

export type Settings =
  | "h1"
  | "h2"
  | "h3"
  | "h3Regular"
  | "h4"
  | "h4Regular"
  | "h5"
  | "h5Regular"
  | "fontFamily"
  | "bigParagraph"
  | "bigParagraphBold"
  | "usualParagraph"
  | "smallParagraph";

export const settings = {
  h1: {
    fontFamily: theme.fonts.headingFontFamily,
    fontSize: "54.9px",
    lineHeight: "63px",
    fontWeight: "bold",
  },
  h2: {
    fontFamily: theme.fonts.headingFontFamily,
    fontSize: "43.9px",
    lineHeight: "50px",
    fontWeight: "bold",
  },
  h3: {
    fontFamily: theme.fonts.headingFontFamily,
    fontSize: "35.1px",
    lineHeight: "40px",
    fontWeight: "bold",
  },
  h3Regular: {
    fontFamily: theme.fonts.headingFontFamily,
    fontSize: "35.1px",
    lineHeight: "40px",
    fontWeight: "normal",
  },
  h4: {
    fontFamily: theme.fonts.headingFontFamily,
    fontSize: "28.1px",
    lineHeight: "32px",
    fontWeight: "bold",
  },
  h4Regular: {
    fontFamily: theme.fonts.headingFontFamily,
    fontSize: "28.1px",
    lineHeight: "32px",
    fontWeight: "normal",
  },
  h5: {
    fontFamily: theme.fonts.headingFontFamily,
    fontSize: "22.5px",
    lineHeight: "26px",
    fontWeight: "bold",
  },
  h5Regular: {
    fontFamily: theme.fonts.headingFontFamily,
    fontSize: "22.5px",
    lineHeight: "26px",
    fontWeight: "normal",
  },
  bigParagraphBold: {
    fontFamily: theme.fonts.bodyFontFamily,
    fontSize: "22.5px",
    lineHeight: "26px",
    fontWeight: "bold",
  },
  bigParagraph: {
    fontFamily: theme.fonts.bodyFontFamily,
    fontSize: "22.5px",
    lineHeight: "26px",
    fontWeight: "normal",
  },
  usualParagraph: {
    fontFamily: theme.fonts.bodyFontFamily,
    fontSize: "18px",
    lineHeight: "22px",
    fontWeight: "normal",
  },
  smallParagraph: {
    fontFamily: theme.fonts.bodyFontFamily,
    fontSize: "14.4px",
    lineHeight: "18px",
    fontWeight: "normal",
  },
};

export const settingsMedium = {
  h1: {
    fontFamily: theme.fonts.headingFontFamily,
    fontSize: "43.9px",
    lineHeight: "50px",
    fontWeight: "bold",
  },
  h2: {
    fontFamily: theme.fonts.headingFontFamily,
    fontSize: "35.1px",
    lineHeight: "40px",
    fontWeight: "bold",
  },
  h3: {
    fontFamily: theme.fonts.headingFontFamily,
    fontSize: "28.1px",
    lineHeight: "32px",
    fontWeight: "bold",
  },
  h3Regular: {
    fontFamily: theme.fonts.headingFontFamily,
    fontSize: "28.1px",
    lineHeight: "32px",
    fontWeight: "normal",
  },
  h4: {
    fontFamily: theme.fonts.headingFontFamily,
    fontSize: "22.5px",
    lineHeight: "26px",
    fontWeight: "bold",
  },
  h4Regular: {
    fontFamily: theme.fonts.headingFontFamily,
    fontSize: "22.5px",
    lineHeight: "26px",
    fontWeight: "normal",
  },
  h5: {
    fontFamily: theme.fonts.headingFontFamily,
    fontSize: "18px",
    lineHeight: "22px",
    fontWeight: "bold",
  },
  h5Regular: {
    fontFamily: theme.fonts.headingFontFamily,
    fontSize: "18px",
    lineHeight: "22px",
    fontWeight: "normal",
  },
  bigParagraphBold: {
    fontFamily: theme.fonts.bodyFontFamily,
    fontSize: "18px",
    lineHeight: "22px",
    fontWeight: "bold",
  },
  bigParagraph: {
    fontFamily: theme.fonts.bodyFontFamily,
    fontSize: "18px",
    lineHeight: "22px",
    fontWeight: "normal",
  },
  usualParagraph: {
    fontFamily: theme.fonts.bodyFontFamily,
    fontSize: "14.4px",
    lineHeight: "18px",
    fontWeight: "normal",
  },
  smallParagraph: {
    fontFamily: theme.fonts.bodyFontFamily,
    fontSize: "10px",
    lineHeight: "12.5px",
    fontWeight: "normal",
  },
};

export const settingsSmall = {
  h1: {
    fontFamily: theme.fonts.headingFontFamily,
    fontSize: "43.9px",
    lineHeight: "63px",
    fontWeight: "bold",
  },
  h2: {
    fontFamily: theme.fonts.headingFontFamily,
    fontSize: "28.1px",
    lineHeight: "32px",
    fontWeight: "bold",
  },
  h3: {
    fontFamily: theme.fonts.headingFontFamily,
    fontSize: "28.1px",
    lineHeight: "32px",
    fontWeight: "bold",
  },
  h3Regular: {
    fontFamily: theme.fonts.headingFontFamily,
    fontSize: "28.1px",
    lineHeight: "32px",
    fontWeight: "normal",
  },
  h4: {
    fontFamily: theme.fonts.headingFontFamily,
    fontSize: "22.5px",
    lineHeight: "25px",
    fontWeight: "bold",
  },
  h4Regular: {
    fontFamily: theme.fonts.headingFontFamily,
    fontSize: "22.5px",
    lineHeight: "25px",
    fontWeight: "normal",
  },
  h5: {
    fontFamily: theme.fonts.headingFontFamily,
    fontSize: "18px",
    lineHeight: "20px",
    fontWeight: "bold",
  },
  h5Regular: {
    fontFamily: theme.fonts.headingFontFamily,
    fontSize: "18px",
    lineHeight: "20px",
    fontWeight: "normal",
  },
  bigParagraphBold: {
    fontFamily: theme.fonts.bodyFontFamily,
    fontSize: "18px",
    lineHeight: "20px",
    fontWeight: "bold",
  },
  bigParagraph: {
    fontFamily: theme.fonts.bodyFontFamily,
    fontSize: "18px",
    lineHeight: "20px",
    fontWeight: "normal",
  },
  usualParagraph: {
    fontFamily: theme.fonts.bodyFontFamily,
    fontSize: "14.4px",
    lineHeight: "18px",
    fontWeight: "normal",
  },
  smallParagraph: {
    fontFamily: theme.fonts.bodyFontFamily,
    fontSize: "10px",
    lineHeight: "12.5px",
    fontWeight: "normal",
  },
};
