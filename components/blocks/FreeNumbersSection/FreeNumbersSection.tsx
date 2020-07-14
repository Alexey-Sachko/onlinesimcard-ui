import React, { useState, useCallback, useEffect } from "react";
import ReactPaginate from "react-paginate";

import Typography from "../../layout/Typography";
import CountryBlock from "./CountryBlock";
import CustomContainer from "../CustomContainer";
import ProductCard from "../ProductCard";
import NumbersList from "./NumbersList";
import MessageList from "./MessageList";
import countryData from "./country-data";
import { getPhoneList, getMessagesList } from "./utils";
import { theme } from "../../../theme/customTheme";

const FreeNumbersSection = () => {
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
    <div className="wrapper">
      <style jsx>
        {`
          .wrapper {
            margin-top: 70px;
            background: ${theme.colors.blueBackground};
          }
          .inner {
            display: flex;
            flex-direction: column;
          }
          .header {
            margin: 70px auto 50px auto;
          }
          .country-block-wrapper {
            display: flex;
            flex-wrap: wrap;
          }
          .country-block-container {
            display: flex;
            margin: 0 auto 0 auto;
            box-shadow: ${theme.shadows.usualShadow};
            border-radius: 5px;
          }
          .content-body {
            margin-top: 70px;
            margin-bottom: 35px;
          }
          .separator-block {
            margin-right: 50px;
          }

          .grid-container {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            box-sizing: border-box;
          }
          .grid-numbers-block {
            flex-grow: 0;
            max-width: 25%;
            flex-basis: 25%;
            margin: 0;
            box-sizing: border-box;
          }
          .grid-messages-block {
            flex-grow: 0;
            max-width: 66.666667%;
            flex-basis: 66.666667%;
            margin: 0;
            box-sizing: border-box;
          }
        `}
      </style>

      <style jsx global>{`
        .wrapper .grid-messages-block .pagination li {
          padding: 8px 7px;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${theme.colors.blueBasic};
          cursor: pointer;
          background: ${theme.colors.whiteBasic};
          user-select: none;
        }
        .wrapper .grid-messages-block .pagination li a {
          outline: none !important;
          font-size: 18px;
        }

        .wrapper .grid-messages-block .active {
          background: ${theme.colors.blueBasic} !important;
          color: ${theme.colors.whiteBasic} !important;
          border-radius: 5px;
        }
        .wrapper .grid-messages-block .pagination {
          display: flex;
          padding-left: 0;
        }
        .pagination-arrow-reverse {
          transform: rotate(180deg);
        }
        .pagination-arrow {
          width: 20px;
          user-select: none;
        }
      `}</style>
      <CustomContainer>
        <div className="inner">
          <div className="header">
            <Typography variant="h3">
              Прием СМС на бесплатные виртуальные номера
            </Typography>
          </div>
          <div className="country-block-wrapper">
            <div className="country-block-container">
              {countryData.map(({ label, image, code }) => (
                <CountryBlock
                  key={code}
                  label={label}
                  image={image}
                  code={code}
                  selected={selectedCountry === code}
                  onSelectCountry={onSelectCountry}
                />
              ))}
            </div>
          </div>
          <div className="content-body">
            <div className="grid-container">
              <div className="grid-numbers-block">
                <NumbersList
                  data={dataNumbers}
                  onSelectNumber={onSelectNumber}
                  selectedNumber={selectedNumber}
                  onReloadNumbers={onReloadNumbers}
                />
              </div>
              <div className="separator-block" />
              <div className="grid-messages-block">
                <MessageList
                  data={dataMessages?.data}
                  onReloadMessages={onReloadMessages}
                />

                <ReactPaginate
                  previousLabel={
                    <img
                      className="pagination-arrow pagination-arrow-reverse"
                      src="static/arrow-paginate.svg"
                    />
                  }
                  nextLabel={
                    <img
                      className="pagination-arrow"
                      src="static/arrow-paginate.svg"
                    />
                  }
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={dataMessages?.last_page}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={3}
                  onPageChange={(data) => setPage(data.selected)}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                />
              </div>
            </div>
          </div>
        </div>
      </CustomContainer>
    </div>
  );
};

export default FreeNumbersSection;
