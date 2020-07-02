import React from "react";
import Box from "@material-ui/core/Box";

import { Container, Title } from "./countries-block.styled";
import { Countries } from "../FreeNumbersSection/types";

type Props = {
  image: string;
  label: string;
  selected: boolean;
  code: Countries;
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
      <Box>
        <img src={image} />
      </Box>
      <Box>
        <Title selected={selected} variant="h3">
          {label}
        </Title>
      </Box>
    </Container>
  );
};

export default CountriesBlock;