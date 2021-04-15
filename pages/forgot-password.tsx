import React from "react";
import { LoginButton } from "../components/atoms/LoginButton";
import { RegisterButton } from "../components/atoms/RegisterButton";

import ForgotPasswordPage from "../components/ForgotPassword/ForgotPasswordPage";
import { HeaderLight } from "../components/HeaderLight";

const ForgotPassword = () => {
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
      <ForgotPasswordPage />
    </>
  );
};

export default ForgotPassword;
