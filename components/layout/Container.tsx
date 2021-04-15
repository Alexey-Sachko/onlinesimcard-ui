import styled from "styled-components";
import { breakpoints } from "../MainPage/breakboints";

export const Container = styled.div`
  width: 1160px;
  padding: 0 20px;
  max-width: 100%;
  margin: 0 auto;

  @media (max-width: ${breakpoints.lg}px) {
    width: 1000px;
  }

  @media (max-width: ${breakpoints.md}px) {
    width: 95%;
  }

  @media (max-width: ${breakpoints.sm}px) {
    width: 100%;
  }
`;
