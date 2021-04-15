import styled from "styled-components";
import { breakpoints } from "../../breakboints";

export const MainSectionRoot = styled.div`
  background: #fff;
  padding-top: 117px;
  padding-bottom: 100px;

  @media (max-width: ${breakpoints.md}px) {
    padding-top: 30px;
    padding-bottom: 60px;
  }
`;

export const MainSectionImgWrap = styled.div`
  width: 379px;
  flex-shrink: 0;

  @media (max-width: ${breakpoints.md}px) {
    width: 350px;
    margin-bottom: 30px;
  }

  @media (max-width: ${breakpoints.sm}px) {
    width: 230px;
  }
`;

export const MainSectionImg = styled.img`
  width: 100%;
`;

export const MainSectionInner = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: ${breakpoints.md}px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`;

export const MainSectionTextBlock = styled.div`
  margin-right: 112px;

  @media (max-width: ${breakpoints.lg}px) {
    margin-right: auto;
  }

  @media (max-width: ${breakpoints.md}px) {
    width: 500px;
    max-width: 100%;
    margin: 0 auto;
    text-align: center;
  }

  @media (max-width: ${breakpoints.sm}px) {
    width: 370px;
  }
`;

export const MainSectionTitle = styled.h1`
  margin-bottom: 20px;
  font-style: normal;
  font-weight: 600;
  font-size: 42px;
  line-height: 115%;
  /* or 48px */

  letter-spacing: 1px;

  /* Text / 1 */

  color: #232628;

  @media (max-width: ${breakpoints.sm}px) {
    font-size: 25px;
  }
`;

export const MainSectionDescription = styled.div`
  margin-bottom: 35px;
  font-weight: 400;
  font-size: 20px;
  line-height: 160%;
  color: #232628;

  @media (max-width: ${breakpoints.sm}px) {
    font-size: 16px;
    padding-right: 20px;
  }
`;

export const MainSectionServiceName = styled.span`
  color: #f74874;
  font-weight: 500;
`;

export const MainSectionBtnWrap = styled.div`
  margin-bottom: 15px;
`;

export const MainSectionCaption = styled.div`
  font-weight: 400;
  font-size: 15px;
`;

export const MainSectionLink = styled.a`
  color: #f74874;
`;
