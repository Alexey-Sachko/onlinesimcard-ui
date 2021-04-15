import { useRouter } from "next/router";
import React from "react";

import { HeaderLight } from "../../components/HeaderLight";
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
      <HeaderLight />
      <ResetPasswordPage tokenId={tokenId} />
    </>
  );
};

export default ResetPassword;
