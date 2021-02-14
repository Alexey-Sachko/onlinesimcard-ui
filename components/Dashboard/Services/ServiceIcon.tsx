import React from "react";

type ServiceIconProps = {
  code: string;
  width?: string;
  height?: string;
};

export const ServiceIcon = ({
  code,
  width = "24",
  height = "24",
}: ServiceIconProps) => {
  const iconUrl = `/static/icons/${code}.png`;
  return <img src={iconUrl} width={width} height={height} />;
};
