import { createMuiTheme } from "@material-ui/core/styles";
// import LatoBlack from "../assets/fonts/Lato/Lato-Black.ttf";
// import LatoBold from "../assets/fonts/Lato/Lato-Bold.ttf";
// import LatoRegular from "../assets/fonts/Lato/Lato-Regular.ttf";
// import LatoLight from "../assets/fonts/Lato/Lato-Light.ttf";

export const THEME = createMuiTheme({
  typography: {
    // fontFamily: `"Lato"`,
  },
  palette: {
    primary: {
      main: "#1E71FF",
    },
  },
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
