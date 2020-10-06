import { createMuiTheme } from "@material-ui/core";

export const muiTheme = createMuiTheme({
  palette: {
    secondary: {
      main: "#FC7E2F",
      contrastText: "#fff",
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          height: "100%",
        },
        body: {
          height: "100%",
        },
        "#__next": {
          height: "100%",
        },
      },
    },
  },
});
