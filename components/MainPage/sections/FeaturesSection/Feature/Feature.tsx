import React from "react";
import {
  FeatureDescription,
  FeatureFooter,
  FeatureRoot,
  FeatureTitle,
} from "./Feature.styled";

export type FeatureProps = {
  title: React.ReactNode;
  description: React.ReactNode;
  iconUrl: string;
};

export const Feature = ({ title, description, iconUrl }: FeatureProps) => {
  return (
    <FeatureRoot>
      <FeatureTitle>{title}</FeatureTitle>
      <FeatureFooter>
        <FeatureDescription>{description}</FeatureDescription>
        <div>
          <img src={iconUrl} />
        </div>
      </FeatureFooter>
    </FeatureRoot>
  );
};
