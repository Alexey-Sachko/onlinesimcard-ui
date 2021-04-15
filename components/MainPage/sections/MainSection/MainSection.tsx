import React from "react";
import { Button } from "../../../atoms/Button";
import { Container } from "../../../layout/Container";
import {
  MainSectionBtnWrap,
  MainSectionCaption,
  MainSectionDescription,
  MainSectionImg,
  MainSectionImgWrap,
  MainSectionInner,
  MainSectionLink,
  MainSectionRoot,
  MainSectionServiceName,
  MainSectionTextBlock,
  MainSectionTitle,
} from "./MainSection.styled";
import image from "./img.svg";
import { useRouter } from "next/router";
import ym from "react-yandex-metrika";

export const MainSection = () => {
  const router = useRouter();

  return (
    <MainSectionRoot>
      <Container>
        <MainSectionInner>
          <MainSectionTextBlock>
            <MainSectionTitle>
              Прием СМС онлайн на виртуальный номер
            </MainSectionTitle>
            <MainSectionDescription>
              <MainSectionServiceName>VirtualNum</MainSectionServiceName> –
              сервис для приватной регистрации на различных сайтах, сервисах и
              приложениях
            </MainSectionDescription>
            <MainSectionBtnWrap>
              <Button
                variant="contained"
                size="big"
                color="primary"
                onClick={() => {
                  ym("reachGoal", "GET_ONE_TIME_NUMBER");
                  router.push("/signup");
                }}
              >
                Получить номер
              </Button>
            </MainSectionBtnWrap>
            <MainSectionCaption>
              или{" "}
              <MainSectionLink href="#free">
                попробовать бесплатно
              </MainSectionLink>
            </MainSectionCaption>
          </MainSectionTextBlock>
          <MainSectionImgWrap>
            <MainSectionImg src={image} alt="Телефон с смс" />
          </MainSectionImgWrap>
        </MainSectionInner>
      </Container>
    </MainSectionRoot>
  );
};
