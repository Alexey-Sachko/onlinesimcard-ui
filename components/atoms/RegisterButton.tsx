import { useRouter } from "next/router";
import React from "react";
import { Button } from "./Button";

export const RegisterButton = () => {
  const router = useRouter();

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => router.push("/signup")}
    >
      Регистрация
    </Button>
  );
};
