import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import to from "await-to-ts";
import { AppThunk } from "../..";
import { UserCredentials } from "./user-credentials.type";
import { ApiService } from "../../../services/api/api.service";
import { UnauthorizedException } from "../../../exceptions/unauthorized.exception";
import { AuthToken } from "../../../services/auth/auth.token";
import { UserRole } from "../../../services/auth/user-role.type";

type UserState = {
  email: string;
  role: UserRole | null;
  isAuthorized: boolean;
  login: {
    loading: boolean;
    error: string | null;
  };
};

type LoginSuccessPayload = {
  email: string;
  role: UserRole | null;
};

const initialState: UserState = {
  email: "",
  role: null,
  isAuthorized: false,
  login: { loading: false, error: null },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    unauthUser: (state) => {
      state.email = "";
      state.isAuthorized = false;
    },
    loginReqStart: (state) => {
      state.login.loading = true;
      state.login.error = null;
    },
    loginReqError: (state, { payload }: PayloadAction<string>) => {
      state.login.loading = false;
      state.login.error = payload;
    },
    loginReqSuccess: (
      state,
      { payload: { email, role } }: PayloadAction<LoginSuccessPayload>
    ) => {
      state.login.loading = false;
      state.email = email;
      state.role = role;
      state.isAuthorized = true;
    },
  },
});

export const userReducer = userSlice.reducer;
export const { unauthUser } = userSlice.actions;
const { loginReqError, loginReqStart, loginReqSuccess } = userSlice.actions;

export const loginUser = (userCredentials: UserCredentials): AppThunk => async (
  dispatch
) => {
  dispatch(loginReqStart());
  const [err, res] = await to(ApiService.post("/auth/login", userCredentials));

  if (!err) {
    const accessToken = res.data.data.accessToken;
    const {
      decodedToken: { email, role },
    } = new AuthToken();
    await AuthToken.storeToken(accessToken);
    dispatch(loginReqSuccess({ email, role }));
    return;
  }

  if (err instanceof UnauthorizedException) {
    dispatch(loginReqError("Неправильный логин или пароль"));
  } else {
    dispatch(loginReqError("Что то пошло не так, попробуйте заного"));
  }
};
