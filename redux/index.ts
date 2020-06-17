import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { NextPageContext, NextComponentType } from "next";
import * as reducers from "./reducers";

const rootReducer = combineReducers(reducers);

export const makeStore = (initialState: any) => {
  return configureStore({
    preloadedState: initialState,
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<typeof rootReducer>;

interface WithStorePageContext extends NextPageContext {
  store: AppStore;
  isServer: boolean;
}

export type PageWithStore<P = {}, IP = P> = NextComponentType<
  WithStorePageContext,
  P,
  IP
>;
