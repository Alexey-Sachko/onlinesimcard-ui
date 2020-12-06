import { Button } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";

import Header from "../../components/Header";
import ResetPasswordPage from "../../components/ResetPassword/ResetPasswordPage";

const ResetPassword = () => {
  const router = useRouter();

  // костыль для икса проблемы https://github.com/vercel/next.js/issues/7731
  const [tokenId, setTokenId] = React.useState("");
  React.useEffect(() => {
    const { tokenId: rawTokenId } = router.query;
    setTokenId(rawTokenId instanceof Array ? rawTokenId[0] : rawTokenId);
  }, []);

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
      <ResetPasswordPage tokenId={tokenId} />
    </>
  );
};

export default ResetPassword;
