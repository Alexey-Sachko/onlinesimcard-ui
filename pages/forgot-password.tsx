import { Box, Button } from "@material-ui/core";
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
      <ForgotPasswordPage />
    </>
  );
};

export default ForgotPassword;
