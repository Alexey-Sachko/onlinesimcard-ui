import { Button } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";

import ForgotPasswordPage from "../components/ForgotPassword/ForgotPasswordPage";
import Header from "../components/Header";

const ForgotPassword = () => {
  const router = useRouter();

  return (
    <>
      <Header
        secondaryAction={
          <Button
            color="secondary"
            variant="outlined"
            onClick={() => router.push("/signup")}
          >
            Регистрация
          </Button>
        }
      />
      <ForgotPasswordPage />
    </>
  );
};

export default ForgotPassword;
