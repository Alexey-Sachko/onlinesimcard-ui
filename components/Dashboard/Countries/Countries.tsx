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
  query Countries($countriesQueryInput: CountriesQueryInput) {
    countries(countriesQueryInput: $countriesQueryInput) {
      code
      name
    }
  }
`;

type CountriesProps = {
  countryCode: string;
  setCountryCode: (code: string) => void;
};

const Countries = ({ countryCode, setCountryCode }: CountriesProps) => {
  const { data } = useCountriesQuery({
    variables: { countriesQueryInput: { notEmpty: true } },
  });

  return (
    <Box>
      <FormControl fullWidth variant="outlined" size="small">
        <InputLabel id="country-label">Страна</InputLabel>
        <Select
          labelId="country-label"
          fullWidth
          label="Страна"
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value as string)}
        >
          {data?.countries.map(({ code, name }) => (
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
