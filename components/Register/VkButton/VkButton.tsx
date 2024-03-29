import { Button } from "@material-ui/core";
import React from "react";

import { env } from "../../../env/env";
import VkIcon from "./VkIcon";

type VkButtonProps = {
  className?: string;
  onClick?: () => void;
};

const VkButton = ({ className, onClick }: VkButtonProps) => {
  const vkOauthHandler = () => {
    onClick?.();
    window.location.href = `${env.apiBaseUrl}/auth/vkontakte?redirect_uri=${location.origin}/dashboard`;
  };

  return (
    <Button
      className={className}
      fullWidth
      color="primary"
      size="small"
      variant="contained"
      startIcon={<VkIcon />}
      onClick={vkOauthHandler}
      style={{ textTransform: "none" }}
    >
      Войти через ВК
    </Button>
  );
};

export default VkButton;
