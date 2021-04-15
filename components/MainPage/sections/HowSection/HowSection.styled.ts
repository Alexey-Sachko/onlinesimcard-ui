import styled from "styled-components";
import { breakpoints } from "../../breakboints";

export const HowSectionRoot = styled.div`
  padding-top: 120px;
  padding-bottom: 100px;
`;

export const HowItemsList = styled.div`
  margin: -25px 0;
  margin-top: 50px;
`;

export const HowItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 -25px;
  padding: 25px 0;

  &:nth-child(even) {
    flex-direction: row-reverse;
  }

  @media (max-width: ${breakpoints.lg}px) {
    margin: 0 -15px;
  }
`;

export const HowItemImgWrap = styled.div`
  width: 400px;
  height: 250px;
  flex-shrink: 0;
  margin: 0 25px;

  @media (max-width: ${breakpoints.lg}px) {
    width: 330px;
    margin: 0 15px;
  }

  @media (max-width: ${breakpoints.md}px) {
    /* width: 350px; */
  }
`;

export const HowItemImg = styled.div`
  width: 100%;
  height: 100%;
  background: #eeeeee;
`;

export const HowItemDescription = styled.div`
  width: 400px;
  margin: 0 25px;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 160%;
  color: #232628;

  @media (max-width: ${breakpoints.lg}px) {
    width: 330px;
    margin: 0 15px;
  }

  @media (max-width: ${breakpoints.md}px) {
  }
`;

export const HowButtonWrap = styled.div`
  margin-top: 75px;
  text-align: center;
`;
