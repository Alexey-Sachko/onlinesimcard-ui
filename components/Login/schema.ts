import * as Yup from "yup"

export type LoginFormState = {
  email: string
  password: string
}

export const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Поле обязательное"),
  password: Yup.string()
    .required("Поле обязательное")
    .min(8, "Пароль должен быть не менее 8 символов")
    .max(20, "Пароль должен быть не более 20 символов"),
})
