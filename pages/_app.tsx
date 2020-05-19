import NextApp from "next/app";
import Head from "next/head";
import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { THEME } from "../theme";
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
      <MuiThemeProvider theme={THEME}>
        <Head>
          {/* <meta name="theme-color" content="#292929" /> */}
          <meta name="language" content="ru" />
          {/* <meta name="keywords" content={keywords.join(", ")} /> */}
          {/* <meta
            name="description"
            content="Descr"
          /> */}
          {/* <link
            rel="shortcut icon"
            type="image/x-icon"
            href="/static/favicon.ico"
          /> */}
          <title>Виртуальный номер для приема СМС</title>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>

        <CssBaseline />
        <Component {...pageProps} />
      </MuiThemeProvider>
    );
  }
}
