import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import CountriesBlock from "./CountriesBlock";
import CustomContainer from "../CustomContainer";
import ProductCard from "../ProductCard";
import NumbersList from "./NumbersList";
import MessageList from "./MessageList";
import {
  Wrapper,
  CountryContainer,
  Pagination,
} from "./free-numbers-sectoin.styled";
import countryData from "./country-data";
import { getPhoneList, getMessagesList } from "./utils";

type Props = {
  onActionClick?: () => void;
};

const FreeNumbersSection = ({ onActionClick }: Props) => {
  const [selectedCountry, setSelectedCountry] = useState(7);
  const [dataNumbers, setDataNumbers] = useState<any>([]);
  const [dataMessages, setDataMessages] = useState<any>({});
  const [selectedNumber, setSelectedNumber] = useState<string | number>(0);
  const [page, setPage] = useState(1);
  const [reloadNumbers, setReloadNumbers] = useState(false);
  const [reloadMessages, setReloadMessages] = useState(false);

  const onSelectCountry = useCallback(
    (code: number) => {
      if (selectedCountry !== code) {
        setSelectedCountry(code);
      }
    },
    [selectedCountry]
  );

  useEffect(() => {
    (async () => {
      const numbersData = await getPhoneList({ selectedCountry });
      const messagesData = await getMessagesList({ page, selectedNumber });

      setDataNumbers(numbersData?.data?.numbers);
      setSelectedNumber(numbersData?.data?.numbers?.[0]?.number);
      setDataMessages(messagesData?.messages);
    })();
  }, [selectedCountry, reloadNumbers]);

  useEffect(() => {
    (async () => {
      const messagesData = await getMessagesList({ page, selectedNumber });
      //@ts-ignore
      setDataMessages(messagesData?.messages);
    })();
  }, [page, selectedNumber, reloadMessages]);

  useEffect(() => {
    setPage(1);
  }, [selectedCountry, selectedNumber, reloadMessages]);

  const onSelectNumber = useCallback(
    (number: number | string) => {
      setSelectedNumber(number);
    },
    [selectedNumber]
  );

  const onReloadMessages = useCallback(() => {
    setReloadMessages((prev) => !prev);
  }, []);
  const onReloadNumbers = useCallback(() => {
    setReloadNumbers((prev) => !prev);
  }, []);

  return (
    <Wrapper mt={14}>
      <CustomContainer>
        <Box display="flex" flexDirection="column">
          <Box mx="auto" mt={14} mb={10}>
            <Typography variant="h2">
              Прием СМС на бесплатные виртуальные номера
            </Typography>
          </Box>
          <Box display="flex" flexWrap="wrap">
            <CountryContainer display="flex" mx="auto">
              {countryData.map(({ label, image, code }) => (
                <CountriesBlock
                  key={code}
                  label={label}
                  image={image}
                  code={code}
                  selected={selectedCountry === code}
                  onSelectCountry={onSelectCountry}
                />
              ))}
            </CountryContainer>
          </Box>
          <Box mt={15}>
            <Grid container>
              <Grid item xs={3}>
                <NumbersList
                  data={dataNumbers}
                  onSelectNumber={onSelectNumber}
                  selectedNumber={selectedNumber}
                  onReloadNumbers={onReloadNumbers}
                />
              </Grid>
              <Box mr={10} />
              <Grid item xs={8}>
                <MessageList
                  data={dataMessages?.data}
                  onReloadMessages={onReloadMessages}
                />

                <Pagination
                  page={page}
                  onChange={(event, page) => setPage(page)}
                  count={dataMessages?.last_page}
                  showFirstButton
                  showLastButton
                />
              </Grid>
            </Grid>
            <Box mt={7}></Box>
          </Box>
        </Box>
      </CustomContainer>
    </Wrapper>
  );
};

export default FreeNumbersSection;
