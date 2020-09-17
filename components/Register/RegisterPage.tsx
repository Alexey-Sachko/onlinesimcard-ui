import React from "react";
import * as Yup from "yup";

type Values = {
  email: string;
  password: string;
  repassword: string;
};

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Некорректный Email").required("Поле обязательное"),
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

const RegisterPage = () => {
  return (
    <div>
      <h1>Регистрация</h1>
      <form>
        <label>
          Email
          <input name="input" />
        </label>
        <label>
          Password
          <input name="input" />
        </label>
        <label>
          Repeat password
          <input name="input" />
        </label>
      </form>
    </div>
  );
};

export default RegisterPage;
