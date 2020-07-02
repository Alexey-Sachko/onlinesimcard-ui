import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import NumberItem from "../NumberItem";
import { CachedIcon, NumbersContainer } from "./numbers-list.styled";
import numbersData from "./numbers-data";

type Props = {
  data: any;
  onSelectNumber: (idx) => void;
  selectedNumber: number;
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
        <Typography variant="h4">cписок номеров</Typography>
        <Box ml={2}>
          <IconButton size="small" onClick={onReloadNumbers}>
            <CachedIcon />
          </IconButton>
        </Box>
      </Box>
      <NumbersContainer mt={6}>
        {data?.map(({ full_number, number }, idx) => (
          <NumberItem
            key={idx}
            idx={idx}
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
