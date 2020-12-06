import * as Yup from "yup";

export type ForgotPasswordFormState = {
  email: string;
};

export type ForgotPasswordFormErrors = Partial<
  Record<keyof ForgotPasswordFormState, string>
>;

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Неправильный email").required("Поле обязательное"),
});
