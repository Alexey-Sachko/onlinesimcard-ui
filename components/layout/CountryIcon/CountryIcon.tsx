import React from "react";

export type CountryIconProps = {
  alpha2Code: string;
  width: number;
};

export const CountryIcon = ({ alpha2Code, width }: CountryIconProps) => {
  return (
    <img
      src={`/static/flags/${alpha2Code}.svg`}
      style={{ border: "1px solid #ccc", borderRadius: "3px" }}
      width={width}
    />
  );
};
