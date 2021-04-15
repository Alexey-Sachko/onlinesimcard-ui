import { useRouter } from "next/router";
import React from "react";
import { Button } from "../../../atoms/Button";
import { SectionTitle } from "../../components/SectionTitle";
import { SmallContainer } from "../../components/SmallContainer";
import {
  HowButtonWrap,
  HowItem,
  HowItemDescription,
  HowItemImg,
  HowItemImgWrap,
  HowItemsList,
  HowSectionRoot,
} from "./HowSection.styled";

const items = [
  {
    description:
      "Покупаете номер, указываете его при регистрации (например, в VK)",
    img: "",
  },
  {
    description: "Получаете код из СМС для подтверждения",
    img: "",
  },
  {
    description: "Подтверждаете регистрацию, используя полученный код",
    img: "",
  },
];

export const HowSection = () => {
  const router = useRouter();

  return (
    <HowSectionRoot>
      <SmallContainer>
        <SectionTitle>Как это работает?</SectionTitle>

        <HowItemsList>
          {items.map(({ description }, idx) => (
            <HowItem key={idx}>
              <HowItemImgWrap>
                <HowItemImg />
              </HowItemImgWrap>
              <HowItemDescription>{description}</HowItemDescription>
            </HowItem>
          ))}
        </HowItemsList>

        <HowButtonWrap>
          <Button
            color="primary"
            size="big"
            variant="contained"
            onClick={() => router.push("/signup")}
          >
            Купить номер
          </Button>
        </HowButtonWrap>
      </SmallContainer>
    </HowSectionRoot>
  );
};
