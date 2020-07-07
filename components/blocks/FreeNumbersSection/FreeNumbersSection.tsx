import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";

import CountriesBlock from "./CountriesBlock";
import CustomContainer from "../CustomContainer";
import ProductCard from "../ProductCard";
import NumbersList from "./NumbersList";
import MessageList from "./MessageList";
import { Wrapper, CountryContainer } from "./free-numbers-sectoin.styled";
import countryData from "./country-data";

type Props = {
  onActionClick?: () => void;
};

const FreeNumbersSection: React.FC<Props> = ({ onActionClick }) => {
  const [selectedCountry, setSelectedCountry] = useState(7);
  const [dataNumbers, setDataNumbers] = useState<any>({});
  const [dataMessages, setDataMessages] = useState<any>({});
  const [selectedNumber, setSelectedNumber] = useState(0);
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
    axios
      .get(`https://onlinesim.ru/api/getFreePhoneList`, {
        params: {
          country: selectedCountry,
          lang: "ru",
        },
      })
      .then((data) => {
        setDataNumbers(data);
        setSelectedNumber(data?.data?.numbers?.[0]?.number);
        axios
          .get(`https://onlinesim.ru/api/getFreeMessageList`, {
            params: {
              page: page,
              phone: selectedNumber,
              lang: "ru",
            },
          })
          .then((data) => {
            setDataMessages(data);
          });
      });
  }, [selectedCountry, reloadNumbers]);

  useEffect(() => {
    axios
      .get(`https://onlinesim.ru/api/getFreeMessageList`, {
        params: {
          page: page,
          phone: selectedNumber,
          lang: "ru",
        },
      })
      .then((data) => {
        setDataMessages(data);
      });
  }, [page, selectedNumber, reloadMessages]);

  useEffect(() => {
    setPage(1);
  }, [selectedCountry, selectedNumber]);

  const onSelectNumber = useCallback(
    (number: number) => {
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
          <Box mt={10}>
            <Grid container>
              <Grid item xs={3}>
                <NumbersList
                  data={dataNumbers?.data?.numbers}
                  onSelectNumber={onSelectNumber}
                  selectedNumber={selectedNumber}
                  onReloadNumbers={onReloadNumbers}
                />
              </Grid>
              <Box mr={10} />
              <Grid item xs={8}>
                <MessageList
                  data={dataMessages?.data?.messages?.data}
                  onReloadMessages={onReloadMessages}
                />

                <Pagination
                  page={page}
                  onChange={(event, page) => setPage(page)}
                  count={dataMessages?.data?.messages?.last_page}
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
