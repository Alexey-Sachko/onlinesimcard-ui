import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import CustomContainer from "../CustomContainer";
import ProductCard from "../ProductCard";

import { Title } from "./free-numbers-sectoin.styled";

type Props = {
  onActionClick?: () => void;
};

const FreeNumbersSection: React.FC<Props> = ({ onActionClick }) => {
  return (
    <Box>
      <CustomContainer>
        <Title>Прием СМС на бесплатные виртуальные номера</Title>
      </CustomContainer>
    </Box>
  );
};

export default FreeNumbersSection;
