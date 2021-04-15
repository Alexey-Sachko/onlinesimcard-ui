import { useRouter } from "next/router";
import React from "react";
import { Button } from "./Button";

export const LoginButton = () => {
  const router = useRouter();

  return (
    <Button color="primary" onClick={() => router.push("/signin")}>
      Войти
    </Button>
  );
};
