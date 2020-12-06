import * as Yup from "yup";

export type ResetPasswordFormState = {
  password: string;
  repassword: string;
};

export const ResetPasswordSchema = Yup.object().shape<ResetPasswordFormState>({
  password: Yup.string()
    .required("Поле обязательное")
    .min(8, "Пароль должен быть не менее 8 символов")
    .max(20, "Пароль должен быть не более 20 символов"),

  // .matches(/[a-zA-Z]/, "Пароль должен включать в себя латинские буквы"),
  repassword: Yup.string()
    // .required("Пароли должны совпадать")
    .test("passwords-match", "Пароли должны совпадать", function (value) {
      return this.parent.password === value;
    }),
});
