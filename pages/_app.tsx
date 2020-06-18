import App, { AppInitialProps, AppContext } from "next/app";
import Head from "next/head";
import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { YMInitializer } from "react-yandex-metrika";
import { THEME } from "../theme";
import { wrapper } from "../redux/index";

class MyApp extends App<AppInitialProps> {
  public static getInitialProps = async ({ Component, ctx }: AppContext) => {
    ctx.store.dispatch({ type: "TOE", payload: "was set in _app" });

    return {
      pageProps: {
        // Call page-level getInitialProps
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}),
        // Some custom thing for all pages
        pathname: ctx.pathname,
      },
    };
  };

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
    );
  }
}

export default wrapper.withRedux(MyApp);
