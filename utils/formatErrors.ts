import { ErrorInterface } from "../types/error.interface";

type ResultFormat = Record<string, string>;

export const formatErrors = (errors: ErrorInterface[]): ResultFormat => {
  return errors.reduce((acc, err) => {
    acc[err.path] = err.message;
    return acc;
  }, {});
};
