import App, { AppInitialProps } from "next/app";
import Head from "next/head";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { YMInitializer } from "react-yandex-metrika";

import withApollo, { WithApollo } from "../lib/withApollo";
// import { ErrorsProvider } from "../lib/errors";

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
      // <MuiThemeProvider theme={THEME}>
      <>
        <style jsx global>
          {`
            body {
              margin: 0px;
            }
          `}
        </style>
        <Head>
          <meta name="language" content="ru" />
          <meta name="yandex-verification" content="41dbcba95b30a3a5" />
          <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
          <title>Виртуальный номер для приема СМС</title>
          <link
            href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Open+Sans:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <ApolloProvider client={apolloClient}>
          <YMInitializer accounts={[62981725]} />
          <Component {...pageProps} />
        </ApolloProvider>
      </>
    );
  }
}

export default withApollo(MyApp);
