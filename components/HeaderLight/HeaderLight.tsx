import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Container } from "../layout/Container";
import {
  HeaderInner,
  HeaderLightLogo,
  HeaderLightLogoMobile,
  HeaderLogoLink,
  HeaderNav,
  HeaderRoot,
} from "./HeaderLight.styled";
import logo from "./logo.svg";
import logoMobile from "./logo-mobile.svg";

export type HeaderLightProps = {
  navbarContent?: React.ReactNode;
};

export const HeaderLight = ({ navbarContent }: HeaderLightProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const listener = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", listener);

    return () => window.removeEventListener("scroll", listener);
  }, []);

  return (
    <HeaderRoot scrolled={scrolled}>
      <Container>
        <HeaderInner>
          <Link href="/">
            <HeaderLogoLink>
              <HeaderLightLogo src={logo} alt="Виртуальный номер" />
              <HeaderLightLogoMobile src={logoMobile} alt="Виртуальный номер" />
            </HeaderLogoLink>
          </Link>
          <HeaderNav>{navbarContent}</HeaderNav>
        </HeaderInner>
      </Container>
    </HeaderRoot>
  );
};
