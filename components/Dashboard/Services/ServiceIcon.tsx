import React from "react";

type ServiceIconProps = {
  code: string;
};

export const ServiceIcon = ({ code }: ServiceIconProps) => {
  const iconUrl = `/static/icons/${code}.png`;
  return <img src={iconUrl} width="24" height="24" />;
};
