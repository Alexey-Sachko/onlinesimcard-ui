import NextApp from "next/app";
import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
// import { ThemeProvider } from 'styled-components'
// const theme = {
//   primary: 'green',
// }
export default class App extends NextApp {
  // remove it here
  componentDidMount() {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles);
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      // <ThemeProvider theme={theme}>
      <>
        <CssBaseline />
        <Component {...pageProps} />
      </>
      // </ThemeProvider>
    );
  }
}
