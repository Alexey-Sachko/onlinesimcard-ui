import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@material-ui/core/Box";

import {
  Container,
  OpenInNewIcon,
  MessageIcon,
  Number,
} from "./number-item.styled";

type Props = {
  number: string;
  full_number: string;
  selected: boolean;
  idx: string;
  onSelectNumber: (number: string) => void;
};

const NumberItem: React.FC<Props> = ({
  number,
  full_number,
  selected,
  idx,
  onSelectNumber,
}) => {
  const onClickNumber = () => {
    onSelectNumber(number);
    navigator.clipboard.writeText(full_number);
  };
  return (
    <Container selected={selected} onClick={onClickNumber}>
      <Box display="flex" alignItems="center">
        <MessageIcon selected={selected} />
      </Box>
      <Box my="auto" ml={3}>
        <Number selected={selected} variant="subtitle2">
          {full_number}
        </Number>
      </Box>
      <Box display="flex" alignItems="center" ml="auto">
        <OpenInNewIcon selected={selected} />
      </Box>
    </Container>
  );
};

export default NumberItem;
