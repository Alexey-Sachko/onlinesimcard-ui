import { configureStore, combineReducers, AnyAction } from "@reduxjs/toolkit";
import { NextPageContext, NextComponentType } from "next";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import * as reducers from "./reducers";

const rootReducer = combineReducers(reducers);

export const makeStore = (initialState: any) => {
  return configureStore({
    preloadedState: initialState,
    reducer: rootReducer,
  });
};
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk = (
  dispatch: (action: AppThunk | AnyAction) => void | Promise<void>,
  getState: () => RootState
) => void | Promise<void>;

interface WithStorePageContext extends NextPageContext {
  store: AppStore;
  isServer: boolean;
}

export type PageWithStore<P = {}, IP = P> = NextComponentType<
  WithStorePageContext,
  P,
  IP
>;
