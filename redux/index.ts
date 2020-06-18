import { configureStore, combineReducers, AnyAction } from "@reduxjs/toolkit";
import { NextPageContext, NextComponentType } from "next";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { MakeStore, createWrapper, Context } from "next-redux-wrapper";
import { reconcilationReducer } from "./reconcilation";
import { rootReducer } from "./reducers";

export const makeStore = (context) => {
  return configureStore({
    reducer: reconcilationReducer,
  });
};
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const wrapper = createWrapper<RootState>(makeStore, { debug: true });

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
