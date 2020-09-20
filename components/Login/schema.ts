import * as Yup from "yup";

export type LoginFormState = {
  email: string;
  password: string;
};

export const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Поле обязательное"),
  password: Yup.string().required("Поле обязательное"),
});
