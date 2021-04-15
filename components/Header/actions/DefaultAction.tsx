import React from "react";
import { useRouter } from "next/router";

import { useAuth } from "../../../hooks/useAuth";
import { Button } from "../../atoms/Button";

export const DefaultAction = () => {
  const router = useRouter();
  const { auth } = useAuth();

  return (
    <>
      {auth ? (
        <Button
          color="primary"
          variant="outlined"
          onClick={() => router.push("/dashboard")}
        >
          Личный кабинет
        </Button>
      ) : (
        <>
          <Button color="primary" onClick={() => router.push("/signin")}>
            Войти
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => router.push("/signup")}
          >
            Регистрация
          </Button>
        </>
      )}
    </>
  );
};
