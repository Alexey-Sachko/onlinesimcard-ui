import React from "react";

import { iconsMap } from "./icons/iconsMap";

type ServiceIconProps = {
  code: string;
};

export const ServiceIcon = ({ code }: ServiceIconProps) => {
  const iconUrl = iconsMap[code] || iconsMap.ot;
  return <img src={iconUrl} width="24" height="24" />;
};
