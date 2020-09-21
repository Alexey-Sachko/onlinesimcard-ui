import App, { AppInitialProps } from "next/app";
import Head from "next/head";
import React from "react";
import { ApolloProvider } from "@apollo/client";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import { MuiThemeProvider } from "@material-ui/core/styles";
import { YMInitializer } from "react-yandex-metrika";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { THEME } from "../theme";
import withApollo, { WithApollo } from "../lib/withApollo";
import { ErrorsProvider } from "../lib/errors";
import resetCss from "../components/layout/resetCss";
import ThemeContext from "../theme/ThemeContext";
import { themeBasic } from "../theme/customTheme";

class MyApp extends App<AppInitialProps & WithApollo> {
  componentDidMount() {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <>
        <style jsx global>
          {resetCss}
        </style>
        <Head>
          <meta name="language" content="ru" />
          <meta name="yandex-verification" content="41dbcba95b30a3a5" />
          {/* <meta name="keywords" content={keywords.join(", ")} /> */}
          {/* <meta
            name="description"
            content="Descr"
          /> */}
          <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
          <title>Виртуальный номер для приема СМС</title>

          <link
            href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Open+Sans:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <ApolloProvider client={apolloClient}>
          <ThemeContext.Provider value={themeBasic}>
            <YMInitializer accounts={[62981725]} />
            <Component {...pageProps} />
          </ThemeContext.Provider>
        </ApolloProvider>
      </>
    );
  }
}

export default withApollo(MyApp);
