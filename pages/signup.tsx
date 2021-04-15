import React from "react";
import RegisterPage from "../components/Register/RegisterPage";
import { HeaderLight } from "../components/HeaderLight";
import { LoginButton } from "../components/atoms/LoginButton";
import { RegisterButton } from "../components/atoms/RegisterButton";

export default function SignUp() {
  return (
    <>
      <HeaderLight
        navbarContent={
          <>
            <LoginButton />
            <RegisterButton />
          </>
        }
      />
      <RegisterPage />
    </>
  );
}
