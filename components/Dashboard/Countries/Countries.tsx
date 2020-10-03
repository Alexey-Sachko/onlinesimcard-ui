import { gql } from "@apollo/client";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import React from "react";

import { useCountriesQuery } from "../../../lib/types";

export const COUNTRIES_QUERY = gql`
  query Countries {
    countriesFromApi {
      code
      name
    }
  }
`;

const Countries = () => {
  const { data } = useCountriesQuery();

  return (
    <Box>
      <FormControl fullWidth variant="outlined">
        <InputLabel id="country-label">Страна</InputLabel>
        <Select labelId="country-label" fullWidth label="Страна">
          {data?.countriesFromApi.map(({ code, name }) => (
            <MenuItem key={code} value={code}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Countries;
