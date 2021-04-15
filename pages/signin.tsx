import React from "react";
import LoginPage from "../components/Login/LoginPage";
import { HeaderLight } from "../components/HeaderLight";
import { DefaultAction } from "../components/Header/actions";

export default function SigninPage() {
  return (
    <>
      <HeaderLight navbarContent={<DefaultAction />} />
      <LoginPage />
    </>
  );
}
