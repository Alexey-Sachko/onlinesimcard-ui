import React, { useState, useCallback, useEffect } from "react";
import { default as ReactPagination } from "react-js-pagination";

import Typography from "../../layout/Typography";
import CountryBlock from "./CountryBlock";
import CustomContainer from "../CustomContainer";
import ProductCard from "../ProductCard";
import NumbersList from "./NumbersList";
import MessageList from "./MessageList";
import countryData from "./country-data";
import { getPhoneList, getMessagesList } from "./utils";
import { theme } from "../../../theme/customTheme";

type Props = {
  setIsShowNotify: (prev: boolean) => void;
};

const FreeNumbersSection: React.FC<Props> = ({ setIsShowNotify }) => {
  const [selectedCountry, setSelectedCountry] = useState(7);
  const [dataNumbers, setDataNumbers] = useState<any>([]);
  const [dataMessages, setDataMessages] = useState<any>({});
  const [selectedNumber, setSelectedNumber] = useState<string | number>(0);
  const [currentPage, setPage] = useState(1);
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
      const messagesData = await getMessagesList({
        page: currentPage,
        selectedNumber,
      });

      setDataNumbers(numbersData?.data?.numbers);
      setSelectedNumber(numbersData?.data?.numbers?.[0]?.number);
      setDataMessages(messagesData?.messages);
    })();
  }, [selectedCountry, reloadNumbers]);

  useEffect(() => {
    (async () => {
      const messagesData = await getMessagesList({
        page: currentPage,
        selectedNumber,
      });
      //@ts-ignore
      setDataMessages(messagesData?.messages);
    })();
  }, [currentPage, selectedNumber, reloadMessages]);

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
            padding-top: 50px;
            background: ${theme.colors.blueBackground};
          }

          .header {
            text-align: center;
            margin-bottom: 50px;
          }

          .content-container {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            grid-gap: 4vw;
            grid-auto-flow: dense;
            grid-template-areas:
              "a a a a a a"
              "b c c c c c";
          }
          .country-block-wrapper {
            grid-area: a;
            display: flex;
            justify-content: center;
          }
          .numbers-list-container {
            grid-area: b;
          }
          .message-list-container {
            grid-area: c;
            margin-bottom: 50px;
          }
          .country-block-container {
            margin: 0 auto 0 auto;
          }
          .country-block-inner {
            box-shadow: ${theme.shadows.usualShadow};
            border-radius: 5px;
            display: flex;
          }

          @media (max-width: 1024px) {
            .content-container {
              grid-template-areas:
                "b b b b a a"
                "c c c c c c";
            }
            .country-block-wrapper {
              margin-left: auto;
            }
            .country-block-container {
              margin: 41px auto auto;
            }
            .country-block-inner {
              flex-direction: column;
            }
          }
          @media (max-width: 768px) {
            .content-container {
              grid-template-areas:
                "b b b b b a"
                "c c c c c c";
            }
            .country-block-container {
              margin: 38px auto auto;
            }
          }

          @media (max-width: 576px) {
            .message-list-container {
              margin-top: 15px;
            }
            .country-block-inner {
              flex-direction: row;
            }
            .content-container {
              grid-template-areas:
                "a a a a a a"
                "b b b b b b"
                "c c c c c c";
            }
            .country-block-wrapper {
              margin-left: 0;
            }
            .country-block-container {
              margin: 0 auto;
            }
            .country-block-container {
              width: 100%;
            }
            .country-block-inner {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
            }
          }
        `}
      </style>

      <style jsx global>{`
        .wrapper .pagination li {
          padding: 10px 15px;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${theme.colors.blueBasic};
          cursor: pointer;
          background: ${theme.colors.whiteBasic};
          user-select: none;
          transition: background 0.2s ease;
        }

        .wrapper .pagination li.disabled:hover {
          background: ${theme.colors.whiteBasic};
        }
        .wrapper .pagination li:hover {
          background: #f0f0f0;
        }
        .wrapper .pagination li a {
          outline: none !important;
          font-size: 18px;
        }

        .wrapper .active {
          background: ${theme.colors.blueBasic} !important;
          color: ${theme.colors.whiteBasic} !important;
          border-radius: 5px;
        }
        .wrapper .pagination {
          display: flex;
          padding-left: 0;
        }
        ul.footable-pagination .pagination-arrow-reverse {
          transform: rotate(180deg);
        }
        ul.footable-pagination .pagination-arrow {
          width: 20px;
          user-select: none;
        }

        ul.footable-pagination .footable-page.disabled {
          opacity: 0.7;
          cursor: initial;
        }

        ul.footable-pagination .footable-page.disabled a {
          cursor: initial;
        }

        ul.footable-pagination .footable-page a {
          cursor: pointer;
          text-decoration: none;
          font-family: ${theme.fonts.bodyFontFamily};
          color: ${theme.colors.blueBasic};
        }

        ul.footable-pagination .footable-page:not(.active) a:active {
          color: ${theme.colors.blueBasic} !important;
        }

        ul.footable-pagination .footable-page.active a {
          color: ${theme.colors.whiteBasic};
          user-select: none;
        }

        @media (max-width: 1024px) {
          .wrapper .pagination {
            justify-content: center;
          }
        }
      `}</style>

      <CustomContainer>
        <div className="header">
          <Typography variant="h3">
            Прием СМС на бесплатные виртуальные номера
          </Typography>
        </div>
        <div className="content-container">
          <div className="country-block-wrapper">
            <div className="country-block-container">
              <div className="country-block-inner">
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
          </div>

          <div className="numbers-list-container">
            <NumbersList
              data={dataNumbers}
              onSelectNumber={onSelectNumber}
              selectedNumber={selectedNumber}
              onReloadNumbers={onReloadNumbers}
              setIsShowNotify={setIsShowNotify}
            />
          </div>

          <div className="message-list-container">
            <MessageList
              data={dataMessages?.data}
              onReloadMessages={onReloadMessages}
            />

            <ReactPagination
              activePage={currentPage}
              itemsCountPerPage={10}
              totalItemsCount={dataMessages?.last_page}
              pageRangeDisplayed={5}
              nextPageText={
                <img
                  className="pagination-arrow"
                  src="static/arrow-paginate.svg"
                />
              }
              prevPageText={
                <img
                  className="pagination-arrow pagination-arrow-reverse"
                  src="static/arrow-paginate.svg"
                />
              }
              firstPageText="«"
              lastPageText="»"
              innerClass="pagination pagination-split footable-pagination float-right"
              itemClass="footable-page"
              onChange={(page: number) => {
                if (page !== currentPage) {
                  setPage(page);
                }
              }}
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
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
              hideFirstLastPages
            />
          </div>
        </div>
      </CustomContainer>
    </div>
  );
};

export default FreeNumbersSection;
