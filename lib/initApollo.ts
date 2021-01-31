import {
  ApolloClient,
  ApolloLink,
  fromPromise,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { onError } from "apollo-link-error";
import { NextPageContext } from "next";

import { env } from "../env/env";
import { notRequiredAuthPages } from "./not-required-auth-pages";

const apiUri = `${env.apiBaseUrl}/graphql`;

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

  const refresh = async () => {
    const res = await fetch(`${env.apiBaseUrl}/auth/refresh`, {
      credentials: "include",
    });
    const dataRes = await res.json();
    if (dataRes.statusCode === 401 && window) {
      const path = window.location.pathname;

      const pathMatched = notRequiredAuthPages.some((pattern) => {
        if (pattern instanceof RegExp) {
          return pattern.test(path);
        }

        return pattern === path;
      });

      if (pathMatched) {
        return;
      }

      window.location.replace("/signin");
    }

    return dataRes;
  };

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          case "UNAUTHENTICATED":
            return fromPromise(refresh()).flatMap(
              () => forward(operation) as any
            ) as any;
        }
      }
    }
  });

  const client = new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Выключаем forceFetch на сервере, так что все запросы выполнятся один раз
    link: ApolloLink.from([errorLink as any, httpLink]),
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
