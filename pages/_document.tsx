import React from "react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets as MaterialUiServerStyleSheets } from "@material-ui/core/styles";
import { ServerStyleSheet } from "styled-components";
export default class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const materialUiSheets = new MaterialUiServerStyleSheets();
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) =>
          sheet.collectStyles(materialUiSheets.collect(<App {...props} />)),
      });
    const initialProps = await NextDocument.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: (
        <React.Fragment key="styles">
          {initialProps.styles}
          {materialUiSheets.getStyleElement()}
          {sheet.getStyleElement()}
        </React.Fragment>
      ),
    };
  }

  render() {
    return (
      <Html lang="ru">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
