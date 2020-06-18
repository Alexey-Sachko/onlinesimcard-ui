import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import to from "await-to-ts";
import { AppThunk } from "../..";
import { UserCredentials } from "./user-credentials.type";
import { ApiService } from "../../../services/api/api.service";
import { UnauthorizedException } from "../../../exceptions/unauthorized.exception";
import { AuthToken } from "../../../services/auth/auth.token";
import { UserRole } from "../../../services/auth/user-role.type";
import { ConflictException } from "../../../exceptions/conflict.exception";

type UserState = {
  email: string;
  accessToken: string | null;
  role: UserRole | null;
  isAuthorized: boolean;
  login: {
    loading: boolean;
    error: string | null;
  };
  signup: {
    done: boolean;
    loading: boolean;
    error: SignupErrorType;
  };
};

type SignupErrorType = string | null;

type LoginSuccessPayload = {
  email: string;
  role: UserRole | null;
  accessToken: string;
};

const initialState: UserState = {
  email: "",
  accessToken: null,
  role: null,
  isAuthorized: false,
  login: { loading: false, error: null },
  signup: { done: false, loading: false, error: null },
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
      {
        payload: { email, role, accessToken },
      }: PayloadAction<LoginSuccessPayload>
    ) => {
      state.login.loading = false;
      state.email = email;
      state.accessToken = accessToken;
      state.role = role;
      state.isAuthorized = true;
    },
    signupReqStart: (state) => {
      state.signup.loading = true;
      state.signup.error = null;
    },
    signupReqError: (state, { payload }: PayloadAction<SignupErrorType>) => {
      state.signup.loading = false;
      state.signup.error = payload;
    },
    signupReqSuccess: (state) => {
      state.signup.loading = false;
      state.signup.done = true;
    },
  },
});

export const userReducer = userSlice.reducer;
const {
  loginReqError,
  loginReqStart,
  loginReqSuccess,
  signupReqError,
  signupReqStart,
  signupReqSuccess,
} = userSlice.actions;

export const loginSuccess = (accessToken: string) => {
  const {
    decodedToken: { email, role },
  } = new AuthToken(accessToken);
  return loginReqSuccess({ email, role, accessToken });
};

export const loginUser = (userCredentials: UserCredentials): AppThunk => async (
  dispatch
) => {
  dispatch(loginReqStart());
  const [err, res] = await to(ApiService.post("/auth/login", userCredentials));

  if (!err) {
    const accessToken = res.data.data.accessToken;
    dispatch(loginSuccess(accessToken));
    await AuthToken.storeToken(accessToken);
    return;
  }

  if (err instanceof UnauthorizedException) {
    dispatch(loginReqError(""));
  } else {
    dispatch(loginReqError("Что то пошло не так, попробуйте заного"));
  }
};

export const signupUser = (
  userCredentials: UserCredentials
): AppThunk => async (dispatch) => {
  dispatch(signupReqStart());
  const [err] = await to(ApiService.post("/users/signup", userCredentials));
  if (!err) {
    dispatch(signupReqSuccess());
    return;
  }
  if (err instanceof ConflictException) {
    dispatch(signupReqError("Пользователь с таким email уже существует."));
  } else {
    dispatch(signupReqError("Произошла ошибка, попробуйте снова"));
  }
};
