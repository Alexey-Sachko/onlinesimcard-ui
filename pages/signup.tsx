import React from "react";
import { Button } from "@material-ui/core";

import Header from "../components/blocks/Header";
import RegisterPage from "../components/Register/RegisterPage";
import { useRouter } from "next/router";

export default function SignUp() {
  const router = useRouter();

  return (
    <>
      <Header
        secondaryAction={
          <Button
            color="secondary"
            variant="outlined"
            onClick={() => router.push("/signin")}
          >
            Войти
          </Button>
        }
      />
      <RegisterPage />
    </>
  );
}
