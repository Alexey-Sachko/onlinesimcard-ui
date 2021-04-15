import Link from "next/link";
import React from "react";
import { Container } from "../../../layout/Container";
import {
  FooterColumn,
  FooterFKLogoWrap,
  FooterInner,
  FooterLink,
  FooterLogo,
  FooterLogoWrap,
  FooterMail,
  FooterRoot,
} from "./Footer.styled";
import logo from "./logo.svg";

export const Footer = () => {
  return (
    <FooterRoot>
      <Container>
        <FooterInner>
          <FooterColumn>
            <FooterLogoWrap href="/">
              <FooterLogo src={logo} alt="Виртуальный номер" />
            </FooterLogoWrap>

            <div>Cервис по приему SMS-сообщений на виртуальные номера</div>

            <FooterFKLogoWrap
              href="//freekassa.ru/"
              className="kassa-logo-wrap"
            >
              <FooterLogo
                src="//www.free-kassa.ru/img/fk_btn/13.png"
                title="Приём оплаты на сайте картами"
              />
            </FooterFKLogoWrap>
          </FooterColumn>

          <FooterColumn>
            <Link href="/oferta">
              <FooterLink>Публичная оферта</FooterLink>
            </Link>

            <Link href="/privacy">
              <FooterLink>Политика конфиденциальности</FooterLink>
            </Link>
          </FooterColumn>

          <FooterColumn>
            <FooterMail href="mailto:support@virtualnum.ru">
              support@virtualnum.ru
            </FooterMail>
          </FooterColumn>
        </FooterInner>
      </Container>
    </FooterRoot>
  );
};
