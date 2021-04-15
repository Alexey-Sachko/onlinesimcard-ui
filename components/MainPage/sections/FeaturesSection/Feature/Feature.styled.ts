import styled from "styled-components";
import { breakpoints } from "../../../breakboints";

export const FeatureRoot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 17px 20px;
  height: 230px;
  width: 100%;
  box-shadow: 0px 60px 80px rgba(15, 15, 15, 0.08),
    0px 25px 33.5px rgba(15, 15, 15, 0.06),
    0px 13.5px 18px rgba(15, 15, 15, 0.05),
    0px 7.5px 10px rgba(15, 15, 15, 0.04), 0px 4px 5.3px rgba(15, 15, 15, 0.03),
    0px 1.6px 2.2px rgba(15, 15, 15, 0.02);
  border-radius: 6px;
  border: 2px solid #d2518b;
  background: #e9e8f1;

  @media (max-width: ${breakpoints.sm}px) {
    height: 180px;
  }
`;

export const FeatureTitle = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 125%;
  text-transform: uppercase;
  color: #3b2f59;

  @media (max-width: ${breakpoints.sm}px) {
    font-size: 18px;
  }
`;

export const FeatureFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export const FeatureDescription = styled.div`
  padding-right: 20px;
  padding-bottom: 7px;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 160%;
  color: #4b3c71;

  @media (max-width: ${breakpoints.sm}px) {
    font-size: 15px;
  }
`;
