import { HYDRATE } from "next-redux-wrapper";
import { rootReducer } from "./reducers";

// create your reducer
export const reconcilationReducer = (state, action) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  } else {
    return rootReducer(state, action);
  }
};
