import React from "react";
import { Box, Button } from "@material-ui/core";
import { useRouter } from "next/router";

import { useAuth } from "../../../hooks/useAuth";

export const DefaultAction = () => {
  const router = useRouter();
  const { auth } = useAuth();

  return (
    <Box display="flex">
      {auth ? (
        <Button
          color="secondary"
          variant="outlined"
          onClick={() => router.push("/dashboard")}
        >
          Личный кабинет
        </Button>
      ) : (
        <>
          <Button
            color="primary"
            onClick={() => router.push("/signin")}
            style={{ marginRight: "5px" }}
          >
            Войти
          </Button>
          <Button
            color="secondary"
            variant="outlined"
            onClick={() => router.push("/signup")}
          >
            Регистрация
          </Button>
        </>
      )}
    </Box>
  );
};
