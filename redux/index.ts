import { configureStore, combineReducers, AnyAction } from "@reduxjs/toolkit";
import { NextPageContext, NextComponentType } from "next";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { MakeStore, createWrapper, Context } from "next-redux-wrapper";
import * as reducers from "./reducers";

const rootReducer = combineReducers(reducers);

export const makeStore = (context) => {
  return configureStore({
    reducer: rootReducer,
  });
};
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const wrapper = createWrapper<RootState>(makeStore, { debug: false });

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
