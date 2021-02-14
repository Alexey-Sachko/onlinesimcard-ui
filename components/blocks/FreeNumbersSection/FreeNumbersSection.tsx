import React, { useState, useCallback, useEffect } from "react";

import Typography from "../../layout/Typography";
import CountryItem from "./CountryItem";
import CustomContainer from "../CustomContainer";
import NumbersList from "./NumbersList";
import MessageList from "./MessageList";
import countryFlags from "./country-settings";
import { getFreeList } from "./utils";
import { useTheme } from "../../hooks/useTheme";
import { FreeNumbers } from "./types";

type Props = {
  setIsShowNotify: (prev: boolean) => void;
};

const FreeNumbersSection: React.FC<Props> = ({ setIsShowNotify }) => {
  const theme = useTheme();
  const [selectedCountry, setSelectedCountry] = useState(7);
  const [freeData, setFreeData] = useState<FreeNumbers>(null);
  const [selectedNumber, setSelectedNumber] = useState<string | number>(0);
  const [currentPage, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const freeNumbers = await getFreeList({
        page: currentPage,
        number: selectedNumber,
        country: selectedCountry,
        setLoading,
      });
      setFreeData(freeNumbers);
    })();
  }, [selectedCountry, selectedNumber]);

  useEffect(() => {
    (async () => {
      const freeNumbers = await getFreeList({
        page: currentPage,
        number: freeData?.messages?.number,
        country: selectedCountry,
        setLoading,
      });

      if (freeNumbers?.messages) {
        setFreeData({
          ...freeNumbers,
          messages: {
            ...freeNumbers?.messages,
            data: [
              ...(freeData?.messages?.data || []),
              ...(freeNumbers.messages.data || []),
            ],
          },
        });
      }
    })();
  }, [currentPage]);

  const onSelectCountry = useCallback(
    (code: number) => {
      if (selectedCountry !== code) {
        setSelectedCountry(code);
      }
    },
    [selectedCountry]
  );

  useEffect(() => {
    setPage(1);
  }, [selectedCountry, selectedNumber]);

  const onSelectNumber = useCallback(
    (number: number | string) => {
      setSelectedNumber(number);
    },
    [selectedNumber]
  );

  const onReloadFreeNumbers = async () => {
    const freeNumbers = await getFreeList({
      page: 1,
      number: selectedNumber,
      country: selectedCountry,
      setLoading,
    });
    setPage(1);
    setFreeData(freeNumbers);
  };

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

          .header__underline {
            position: relative;
          }
          .content-container {
            padding-bottom: 40px;
            display: grid;
            grid-template-columns: repeat(12, 0.5fr);
            grid-gap: 2vw;
            grid-auto-flow: dense;
            grid-template-areas: "a a a b b b b b b b b b";
          }

          .country-numbers {
            background: #fff;
            border-radius: 10px;
            padding: 15px 0;
            grid-area: a;
            margin-right: 30px;
            height: max-content;
          }

          .header__underline:after {
            content: "";
            position: absolute;
            left: 0;
            bottom: 8px;
            height: 10px;
            width: 100%;
            background: #ffd028;
          }

          .header__underline-text {
            position: relative;
            z-index: 900;
          }

          .message-list-container {
            grid-area: b;
          }
          .numbers-seperator {
            padding-top: 10px;
            margin: 0 20px 10px 20px;
            border-bottom: 1px solid #dedede;
          }

          @media (max-width: 1276px) {
            .content-container {
              grid-template-columns: repeat(12, 0.5fr);
              grid-template-areas: "a a a a b b b b b b b b";
            }

            .country-numbers {
              margin-right: 0;
            }
          }

          @media (max-width: 1024px) {
            .content-container {
              grid-template-columns: repeat(1, 1fr);
              grid-template-areas: "a" "b";
            }

            .country-numbers {
              margin-right: 0;
            }
          }
          @media (max-width: 768px) {
            .content-container {
              grid-template-columns: repeat(1, 1fr);
              grid-template-areas: "a" "b";
            }
          }

          @media (max-width: 576px) {
            .message-list-container {
              margin-top: 15px;
            }
          }
        `}
      </style>

      <CustomContainer>
        <div className="header">
          <Typography color="textPrimary" variant="h2">
            Попробуйте наши{" "}
            <span className="header__underline">
              <span className="header__underline-text">бесплатные</span>
            </span>{" "}
            <br />
            виртуальные номера
          </Typography>
        </div>
        <div className="content-container">
          <div className="country-numbers">
            {Object.values(freeData?.countries || {}).map(
              ({ country, country_text }) => (
                <CountryItem
                  key={country}
                  label={country_text}
                  image={
                    countryList[country]?.flagComp ||
                    countryList.default.flagComp
                  }
                  code={country}
                  selected={selectedCountry === country}
                  onSelectCountry={onSelectCountry}
                />
              )
            )}
            <div className="numbers-seperator"></div>
            <NumbersList
              data={freeData?.numbers || {}}
              onSelectNumber={onSelectNumber}
              selectedNumber={selectedNumber || freeData?.messages?.number}
              setIsShowNotify={setIsShowNotify}
            />
          </div>

          <div className="message-list-container">
            <MessageList
              freeNumbers={freeData}
              onReloadFreeNumbers={onReloadFreeNumbers}
              setPage={setPage}
              loading={loading}
            />
          </div>
        </div>
      </CustomContainer>
    </div>
  );
};

export default FreeNumbersSection;
