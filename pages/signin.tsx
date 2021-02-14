import React from "react";
import { Box, Button } from "@material-ui/core";
import { useRouter } from "next/router";

import LoginPage from "../components/Login/LoginPage";
import Header from "../components/Header";

export default function SigninPage() {
  const router = useRouter();

  return (
    <>
      <Header
        secondaryAction={
          <Box ml="auto">
            <Button
              color="secondary"
              variant="outlined"
              onClick={() => router.push("/signup")}
            >
              Регистрация
            </Button>
          </Box>
        }
      />
      <LoginPage />
    </>
  );
}
