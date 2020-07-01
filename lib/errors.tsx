import React, { useContext } from "react";
import { ApolloError } from "@apollo/client";

const ErrorsContext = React.createContext<ErrorsCacheObject>({});

export type ErrorsCacheObject = Record<string, ApolloError>;

type Props = {
  ctx: ErrorsCacheObject;
};

export const ErrorsProvider: React.FC<Props> = ({ ctx, children }) => {
  return (
    <ErrorsContext.Provider value={ctx}>{children}</ErrorsContext.Provider>
  );
};

export const useErrors = (cacheKey: string, error: ApolloError) => {
  const errCtx = useContext(ErrorsContext);
  let err = error;

  if (typeof window !== "undefined") {
    return err;
  }

  if (err) {
    errCtx[cacheKey] = err;
  } else if (errCtx[cacheKey] && !err) {
    err = errCtx[cacheKey];
  }
  return err;
};
