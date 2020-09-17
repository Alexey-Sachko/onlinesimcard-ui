import { ErrorType } from "../lib/types";

export const formatErrors = <T extends Record<string, string>>(
  errors: ErrorType[]
): T => {
  return errors.reduce(
    (acc, err) => ({ ...acc, [err.path]: err.message }),
    {} as T
  );
};
