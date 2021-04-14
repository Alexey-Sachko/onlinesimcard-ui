import React from "react";
import { Box, Button } from "@material-ui/core";

import Header from "../components/Header";
import RegisterPage from "../components/Register/RegisterPage";
import { useRouter } from "next/router";

export default function SignUp() {
  const router = useRouter();

  return (
    <>
      <Header
        secondaryAction={
          <Box ml="auto">
            <Button
              color="secondary"
              variant="outlined"
              onClick={() => router.push("/signin")}
            >
              Войти
            </Button>
          </Box>
        }
      />
      <RegisterPage />
    </>
  );
}
