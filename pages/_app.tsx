import NextApp from "next/app";
import Head from "next/head";
import React from "react";
import withRedux from "next-redux-wrapper";
import { Provider } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { YMInitializer } from "react-yandex-metrika";
import { THEME } from "../theme";
import { makeStore, AppStore } from "../redux/index";

type AppPropsWithStore = {
  store: AppStore;
};

class App extends NextApp<AppPropsWithStore> {
  // remove it here
  componentDidMount() {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles);
  }
  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={THEME}>
          <Head>
            {/* <meta name="theme-color" content="#292929" /> */}
            <meta name="language" content="ru" />
            {/* <meta name="keywords" content={keywords.join(", ")} /> */}
            {/* <meta
            name="description"
            content="Descr"
          /> */}
            <link
              rel="shortcut icon"
              type="image/x-icon"
              href="/static/favicon.ico"
            />
            <title>Виртуальный номер для приема СМС</title>
            {/* <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          /> */}
            <link
              href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@600&display=swap"
              rel="stylesheet"
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap"
              rel="stylesheet"
            />
          </Head>

          <YMInitializer accounts={[62981725]} />
          <CssBaseline />
          <Component {...pageProps} />
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default withRedux(makeStore)(App);
