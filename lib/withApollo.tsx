import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import App, { AppContext, AppProps } from "next/app";
import Head from "next/head";

import initApollo from "./initApollo";
import { ErrorsProvider } from "./errors";

export interface WithApollo {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

export default (MyApp: typeof App) =>
  class Apollo extends App {
    static async getInitialProps(ctx: AppContext) {
      const { Component, router } = ctx;

      const appProps = await MyApp.getInitialProps(ctx);

      // Запускаем все graphql-запросы в дереве компонентов
      // и извлекаем полученные данные
      const apollo = initApollo({}, ctx.ctx);
      const errorsContext = {};
      if (typeof window === "undefined") {
        // Импортируем `@apollo/react-ssr` динамически,
        // чтобы избежать его попадания в клиентский бандл
        const { getDataFromTree } = await import("@apollo/react-ssr");

        try {
          await getDataFromTree(
            <ErrorsProvider ctx={errorsContext}>
              <MyApp
                {...appProps}
                Component={Component}
                router={router}
                apolloClient={apollo}
              />
            </ErrorsProvider>
          );
        } catch (error) {
          // Предотвращаем поломку SSR из-за ошибок
          // Их можно обработать в компонентах с помощью пропа data.error
          console.error("Ошибка при запуске `getDataFromTree`", error);
        }

        // getDataFromTree не вызывает componentWillUnmount
        // поэтому побочные эффекты от вставки head должны быть очищены вручную
        Head.rewind();
      }

      // Извлекаем полученные данные из кэша apollo-client
      const apolloState = apollo.cache.extract();
      return {
        ...appProps,
        apolloState,
        errorsContext,
      };
    }

    apolloClient: ApolloClient<NormalizedCacheObject>;

    constructor(props: AppProps & { apolloState: NormalizedCacheObject }) {
      super(props);
      this.apolloClient = initApollo(props.apolloState);
    }

    render() {
      return (
        //@ts-ignore
        <ErrorsProvider ctx={this.props.errorsContext}>
          <MyApp {...this.props} apolloClient={this.apolloClient} />
        </ErrorsProvider>
      );
    }
  };
