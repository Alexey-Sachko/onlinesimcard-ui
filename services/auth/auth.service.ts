import { UserCredentials } from "./user-credentials.type";
import { ApiService } from "../api/api.service";
import to from "await-to-ts";
import { ConflictException } from "../../exceptions/conflict.exception";
import { UnauthorizedException } from "../../exceptions/unauthorized.exception";
import { AuthToken } from "./auth.token";

export const login = async (userCredentials: UserCredentials) => {
  const [err, res] = await to(ApiService.post("/auth/login", userCredentials));
  if (!err) {
    if (res.data.data?.accessToken) {
      await AuthToken.storeToken(res.data.data.accessToken);
    }

    return { ok: true };
  }
  if (err instanceof UnauthorizedException) {
    return { ok: false, invalid: true };
  }
  throw err;
};

export const signup = async (userCredentials: UserCredentials) => {
  const [err] = await to(ApiService.post("/user/signup", userCredentials));
  if (!err) {
    return { ok: true };
  }
  if (err instanceof ConflictException) {
    return { ok: false, conflict: true };
  }
  throw err;
};
