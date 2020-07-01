import { createMuiTheme } from "@material-ui/core/styles";
// import LatoBlack from "../assets/fonts/Lato/Lato-Black.ttf";
// import LatoBold from "../assets/fonts/Lato/Lato-Bold.ttf";
// import LatoRegular from "../assets/fonts/Lato/Lato-Regular.ttf";
// import LatoLight from "../assets/fonts/Lato/Lato-Light.ttf";

export const THEME = createMuiTheme({
  typography: {
    h1: {
      fontWeight: "bold",
      fontSize: "43.9px",
      lineHeight: "50px",
      color: "#383838",
      fontFamily: `'Libre Baskerville', sans-serif`,
    },
    h2: {
      fontWeight: "bold",
      fontSize: "35.1px",
      lineHeight: "40px",
      color: "#383838",
      fontFamily: `'Libre Baskerville', sans-serif`,
    },
    h3: {
      fontWeight: "normal",
      fontSize: "28.1px",
      lineHeight: "32px",
      color: "#383838",
      fontFamily: `'Libre Baskerville', sans-serif`,
    },
    h4: {
      fontWeight: "bold",
      fontSize: "22.5px",
      lineHeight: "26px",
      color: "#383838",
      fontFamily: `'Libre Baskerville', sans-serif`,
    },
    h5: {
      fontWeight: "normal",
      fontSize: "22.5px",
      lineHeight: "26px",
      color: "#383838",
      fontFamily: `'Libre Baskerville', sans-serif`,
    },
    subtitle1: {
      fontWeight: "normal",
      fontSize: "22.5px",
      lineHeight: "28px",
      color: "#383838",
      fontFamily: `Open Sans, sans-serif`,
    },
    subtitle2: {
      fontWeight: "normal",
      fontSize: "18px",
      lineHeight: "22px",
      color: "#383838",
      fontFamily: `Open Sans, sans-serif`,
    },
    p: {
      fontWeight: "normal",
      fontSize: "14.4px",
      lineHeight: "18px",
      color: "#383838",
      fontFamily: `Open Sans, sans-serif`,
    },
  },
  palette: {
    primary: {
      main: "#1E71FF",
    },
    secondary: {
      main: "#F0864A",
      contrastText: "#fff",
    },
  },
  spacing: 5,
  // overrides: {
  //   MuiCssBaseline: {
  //     "@global": {
  //       "@font-face": [
  //         {
  //           fontFamily: `"Lato"`,
  //           fontStyle: "normal",
  //           fontWeight: 400,
  //           src: `url("${LatoRegular}")`,
  //         },
  //         {
  //           fontFamily: `"Lato"`,
  //           fontStyle: "normal",
  //           fontWeight: 900,
  //           src: `url("${LatoBlack}")`,
  //         },
  //         {
  //           fontFamily: `"Lato"`,
  //           fontStyle: "normal",
  //           fontWeight: 700,
  //           src: `url("${LatoBold}")`,
  //         },
  //         {
  //           fontFamily: `"Lato"`,
  //           fontStyle: "normal",
  //           fontWeight: 300,
  //           src: `url("${LatoRegular}")`,
  //         },
  //       ],
  //     },
  //   },
  // },
});
