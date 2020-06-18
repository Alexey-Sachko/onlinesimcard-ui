import { UserCredentials } from "./user-credentials.type";
import { ApiService } from "../api/api.service";
import to from "await-to-ts";
import { ConflictException } from "../../exceptions/conflict.exception";

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
