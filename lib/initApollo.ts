import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { NextPageContext } from "next";

const apiUri = "https://virtualnum.ru/api/v1/graphql";
// const apiUri = "http://localhost:4500/api/v1/graphql";

const create = (initialState: NormalizedCacheObject, ctx?: NextPageContext) => {
  const isBrowser = typeof window !== "undefined";
  const httpLink = new HttpLink({
    headers: ctx?.req?.headers,
    uri: apiUri,
    credentials: "include", // TODO same-origin on production
    fetch: async (input, init) => {
      let url = "";

      if (typeof input === "string") {
        url = input;
      } else {
        url = input.url;
      }

      if (!isBrowser && /^https:/.test(url)) {
        const https = await import("https");
        //@ts-ignore
        init.agent = new https.Agent({
          rejectUnauthorized: false,
        });
      }

      return fetch(input, init);
    },
  });

  const client = new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Выключаем forceFetch на сервере, так что все запросы выполнятся один раз
    link: httpLink,
    cache: new InMemoryCache().restore(initialState),
  });

  return client;
};

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

export default function initApollo(
  initialState: NormalizedCacheObject = {},
  ctx?: NextPageContext
) {
  /**
   * Создаем apollo-client для каждого запроса на серверной стороне,
   * чтобы данные не были общими для разных соединений
   */
  if (typeof window === "undefined") {
    return create(initialState, ctx);
  }

  // Переиспользуем apollo-client на клиентской стороне
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
