import App, { AppInitialProps } from "next/app";
import Head from "next/head";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { YMInitializer } from "react-yandex-metrika";
import { MuiThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { SnackbarProvider } from "notistack";

import withApollo, { WithApollo } from "../lib/withApollo";
import { muiTheme } from "../lib/muiTheme";
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

            html,
            body,
            #__next {
              height: 100%;
            }
          `}
        </style>
        <Head>
          <meta name="language" content="ru" />
          <meta name="yandex-verification" content="41dbcba95b30a3a5" />
          <meta name="megakassa" content="20482a8ccc7" />
          <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
          <title>
            виртуальные одноразовые номера телефонов для регистрации | приема
            смс онлайн | купить | получить sms бесплатно
          </title>
          <link
            href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Open+Sans:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />

          <script
            type="text/javascript"
            data-id="cleversite"
            dangerouslySetInnerHTML={{
              __html: `
            (function() { 
              var s = document['createElement']('script');
              s.type = 'text/javascript'; 
              s.async = true; 
              s.charset = 'utf-8';	
              s.src = '//cleversite.ru/cleversite/widget_new.php?supercode=1&referer_main='+encodeURIComponent(document.referrer)+'&clid=88865aFFzn&siteNew=112487'; 
              var ss = document['getElementsByTagName']('script')[0]; 
              if(ss) {
                ss.parentNode.insertBefore(s, ss);
              } else {
                document.documentElement.firstChild.appendChild(s);
              };
            })();
          `,
            }}
          />
        </Head>

        <CssBaseline />
        <ApolloProvider client={apolloClient}>
          <YMInitializer accounts={[62981725]} />
          <MuiThemeProvider theme={muiTheme}>
            <SnackbarProvider
              maxSnack={3}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              autoHideDuration={2000}
            >
              <Component {...pageProps} />
            </SnackbarProvider>
          </MuiThemeProvider>
        </ApolloProvider>
      </>
    );
  }
}

export default withApollo(MyApp);
