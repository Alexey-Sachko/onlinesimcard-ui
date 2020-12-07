import React from "react";

type ServiceIconProps = {
  code: string;
  size?: number;
};

export const ServiceIcon = ({ code, size = 24 }: ServiceIconProps) => {
  const iconUrl = `/static/icons/${code}.png`;
  return <img src={iconUrl} width={size} height={size} />;
};
