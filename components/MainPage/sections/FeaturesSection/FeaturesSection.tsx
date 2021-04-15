import React from "react";
import { Feature } from "./Feature";
import {
  FeaturesSectionInner,
  FeaturesSectionItem,
  FeaturesSectionRoot,
} from "./FeaturesSection.styled";

import email from "./icons/email_phone.svg";
import check from "./icons/check_phone.svg";
import countries from "./icons/countries_phone.svg";
import money from "./icons/money_phone.svg";
import { SmallContainer } from "../../components/SmallContainer";

export const FeaturesSection = () => {
  return (
    <FeaturesSectionRoot>
      <SmallContainer>
        <FeaturesSectionInner>
          <FeaturesSectionItem>
            <Feature
              title="Приём смс"
              description="Безлимитный в течении 20 минут"
              iconUrl={email}
            />
          </FeaturesSectionItem>
          <FeaturesSectionItem>
            <Feature
              title={<>Количество стран</>}
              description="Более 10 стран в наличии"
              iconUrl={countries}
            />
          </FeaturesSectionItem>
          <FeaturesSectionItem>
            <Feature
              title="Чистый номер"
              description="Нигде не использовался"
              iconUrl={check}
            />
          </FeaturesSectionItem>
          <FeaturesSectionItem>
            <Feature
              title="Цены за номер"
              description="От 1 рубля за сайт"
              iconUrl={money}
            />
          </FeaturesSectionItem>
        </FeaturesSectionInner>
      </SmallContainer>
    </FeaturesSectionRoot>
  );
};
