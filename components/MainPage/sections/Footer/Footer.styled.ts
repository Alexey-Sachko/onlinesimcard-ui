import styled from "styled-components";
import { breakpoints } from "../../breakboints";

export const FooterRoot = styled.div`
  padding: 60px 0;
  background: #3b2f59;
  color: #e9e8f1;
  font-weight: normal;
  font-size: 18px;
  line-height: 120%;

  @media (max-width: ${breakpoints.md}px) {
    padding: 30px 0;
  }
`;

export const FooterColumn = styled.div`
  max-width: 380px;

  &:last-child {
    text-align: right;
  }
`;

export const FooterInner = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: ${breakpoints.md}px) {
    flex-direction: column;
  }
`;

export const FooterLogoWrap = styled.a`
  display: block;
  margin-bottom: 18px;
  width: 177px;

  @media (max-width: ${breakpoints.md}px) {
    width: 120px;
  }
`;

export const FooterLogo = styled.img`
  width: 100%;
`;

export const FooterFKLogoWrap = styled.a`
  margin-top: 20px;
  width: 80px;
  display: block;
`;

export const FooterLink = styled.a`
  display: block;
  margin-bottom: 15px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const FooterMail = styled.a`
  font-weight: 600;
  font-size: 20px;
  text-decoration: none;
  color: #f74874;
`;
