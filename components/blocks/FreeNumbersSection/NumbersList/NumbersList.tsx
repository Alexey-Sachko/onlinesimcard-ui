import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import NumberItem from "../NumberItem";
import {
  CachedIcon,
  NumbersContainer,
  TypographySpacing,
  ResetButton,
} from "./numbers-list.styled";
import numbersData from "./numbers-data";

type Props = {
  data: any;
  onSelectNumber: (number: string | number) => void;
  selectedNumber: number | string;
  onReloadNumbers: () => void;
};

const NumbersList: React.FC<Props> = ({
  data,
  onSelectNumber,
  selectedNumber,
  onReloadNumbers,
}) => {
  return (
    <Box>
      <Box ml={4} display="flex">
        <TypographySpacing variant="h4">СПИСОК НОМЕРОВ</TypographySpacing>
        <Box ml={3}>
          <ResetButton size="small" onClick={onReloadNumbers}>
            <CachedIcon />
          </ResetButton>
        </Box>
      </Box>
      <NumbersContainer mt={5}>
        {data?.map(({ full_number, number }, idx) => (
          <NumberItem
            key={idx}
            onSelectNumber={onSelectNumber}
            full_number={full_number}
            number={number}
            selected={selectedNumber === number}
          />
        ))}
      </NumbersContainer>
    </Box>
  );
};

export default NumbersList;
