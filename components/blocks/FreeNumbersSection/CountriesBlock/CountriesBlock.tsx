import React from "react";
import Box from "@material-ui/core/Box";

import { Container, Title } from "./countries-block.styled";
import { Countries } from "../types";

type Props = {
  image: string;
  label: string;
  selected: boolean;
  code: number;
  onSelectCountry: (code: number) => void;
};

const CountriesBlock: React.FC<Props> = ({
  image,
  label,
  selected,
  onSelectCountry,
  code,
}) => {
  return (
    <Container selected={selected} onClick={() => onSelectCountry(code)}>
      <Box m="auto">
        <Box>
          <img src={image} />
        </Box>
        <Box>
          <Title selected={selected} variant="h5">
            {label}
          </Title>
        </Box>
      </Box>
    </Container>
  );
};

export default CountriesBlock;
