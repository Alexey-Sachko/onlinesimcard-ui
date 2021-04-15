import styled from "styled-components";
import { breakpoints } from "../../breakboints";

export const FeaturesSectionRoot = styled.div`
  padding: 75px 0;
  background: #e9e8f1;

  @media (max-width: ${breakpoints.sm}px) {
    padding: 40px 0;
  }
`;

export const FeaturesSectionInner = styled.div`
  margin: 0 -25px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: ${breakpoints.md}px) {
    margin: 0;
  }
`;

export const FeaturesSectionItem = styled.div`
  padding: 25px;
  width: 400px;

  @media (max-width: ${breakpoints.md}px) {
    width: 370px;
    padding: 12px;
  }

  @media (max-width: ${breakpoints.sm}px) {
    width: 90%;
  }
  /* margin: -10px; */
`;
