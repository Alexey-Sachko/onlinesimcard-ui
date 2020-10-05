import { gql } from "@apollo/client";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
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

type CountriesProps = {
  countryCode: string;
  setCountryCode: (code: string) => void;
};

const Countries = ({ countryCode, setCountryCode }: CountriesProps) => {
  const { data } = useCountriesQuery();

  return (
    <Box>
      <Tooltip arrow title="Выбор страны будет доступен позже">
        <FormControl fullWidth variant="outlined" size="small">
          <InputLabel id="country-label">Страна</InputLabel>
          <Select
            labelId="country-label"
            fullWidth
            label="Страна"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value as string)}
            disabled
          >
            {data?.countriesFromApi.map(({ code, name }) => (
              <MenuItem key={code} value={code}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Tooltip>
    </Box>
  );
};

export default Countries;
