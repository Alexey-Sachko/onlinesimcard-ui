import styled, { css } from "styled-components";
import { breakpoints } from "../MainPage/breakboints";

export type HeaderRootProps = {
  scrolled: boolean;
};

export const HeaderInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderNav = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderLogoLink = styled.a`
  display: flex;
  align-items: center;
  width: 177px;
  flex-shrink: 0;

  @media (max-width: ${breakpoints.sm}px) {
    width: 100px;
  }

  @media (max-width: 350px) {
    width: 40px;
  }
`;

export const HeaderLightLogo = styled.img`
  width: 100%;

  @media (max-width: 350px) {
    display: none;
  }
`;

export const HeaderLightLogoMobile = styled.img`
  width: 100%;
  display: none;

  @media (max-width: 350px) {
    display: block;
  }
`;

export const HeaderRoot = styled.div`
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 20px 0;
  background: #fff;
  transition: all 0.3s ease;

  ${(p: HeaderRootProps) =>
    p.scrolled
      ? css`
          box-shadow: 0px 8px 8px 1px rgba(34, 60, 80, 0.12);
          padding: 5px 0;
        `
      : ""};
`;
