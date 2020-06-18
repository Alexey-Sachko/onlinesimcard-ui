import { combineReducers } from "@reduxjs/toolkit";
import { userReducer as user } from "./features/user";

export const rootReducer = combineReducers({ user });
