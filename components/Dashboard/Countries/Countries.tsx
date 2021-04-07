import { gql } from "@apollo/client";
import React, { ChangeEvent, useState, useEffect } from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import { useCountriesQuery } from "../../../lib/types";
import { CountryIcon } from "../../layout/CountryIcon";

export const COUNTRIES_QUERY = gql`
  query Countries($countriesQueryInput: CountriesQueryInput) {
    countries(countriesQueryInput: $countriesQueryInput) {
      code
      name
      alpha2Code
    }
  }
`;

type CountriesProps = {
  countryCode: string;
  setCountryCode: (code: string) => void;
};

const Countries = ({ countryCode, setCountryCode }: CountriesProps) => {
  const [openSelectOptions, setOpenSelectOptions] = useState(false);
  const { data } = useCountriesQuery({
    variables: { countriesQueryInput: { notEmpty: true } },
  });

  const onOptionsSelectClose = () => {
    setOpenSelectOptions(false);
  };
  const onOptionsSelectOpen = () => {
    setOpenSelectOptions((prevState) => !prevState);
  };
  const onSelectMenuItem = (code: string) => {
    setCountryCode(code);
    console.log("code", code);
  };
  const selectHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setCountryCode(event.target.value);

  const selectedCountry = data?.countries.find(
    ({ code }) => code === countryCode
  );

  const selectedCountryName = selectedCountry?.name || "";

  return (
    <>
      {/* <div className="title-select">Страна</div> */}

      <div className="custom-select">
        <input
          className="custom-select__input"
          value={countryCode}
          onChange={selectHandler}
        />
        <ClickAwayListener onClickAway={onOptionsSelectClose}>
          <div className="custom-select__label" onClick={onOptionsSelectOpen}>
            <div className="custom-select__label_text">
              {selectedCountryName}
            </div>
            <div className="menu-item-icon">
              {selectedCountry && (
                <CountryIcon
                  alpha2Code={selectedCountry.alpha2Code}
                  width={20}
                />
              )}
            </div>
            <div className="custom-select__label_toggle-button">
              <img src="/static/eva_arrow-ios-downward-fill.svg" alt="" />
            </div>
            {openSelectOptions && (
              <div className="custom-select__options-list">
                {data?.countries.map(({ code, name, alpha2Code }) => {
                  return (
                    <div
                      key={code}
                      className="menu-item"
                      onClick={() => onSelectMenuItem(code)}
                    >
                      <div className="menu-item-text">{name}</div>
                      <div className="menu-item-icon">
                        <CountryIcon alpha2Code={alpha2Code} width={22} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </ClickAwayListener>
      </div>
      <style jsx>{`
        .custom-select {
          width: 100%;
          position: relative;
        }
        .menu-item-text {
          color: #232628;
          margin-right: 10px;
        }
        .menu-item-icon {
          width: 24px;
          height: 17px;
        }
        .menu-item {
          display: flex;
          align-items: center;
          padding: 12.5px 20px;
          cursor: pointer;
          font-size: 16px;
          line-height: 19px;
          color: #232628;
          transition: all 0.3s ease-out;
        }
        .menu-item:first-child {
          border-radius: 6px 0 0 0;
        }
        .menu-item:first-child:last-child {
          border-radius: 0 0 6px 6px;
        }
        .menu-item:hover {
          background: #eae7f2;
        }
        .custom-select__input {
          opacity: 0;
          position: absolute;
          left: -9990px;
        }
        .custom-select__label {
          height: 31px;
          padding: 0 15px;
          display: flex;
          align-items: center;
          background: #fff;
          color: #232628;
          border-radius: 6px;
          border: 1px solid #f74874;
          cursor: pointer;
        }
        .custom-select__options-list {
          position: absolute;
          top: 35px;
          left: 0;
          width: 100%;
          z-index: 22;
          background: #fff;
          border-radius: 6px;
          max-height: 700px;
          overflow: auto;
          box-shadow: 0px 54px 74px rgba(0, 0, 0, 0.13),
            0px 34px 34px rgba(0, 0, 0, 0.02), 0px 17px 22px rgba(0, 0, 0, 0.05);
        }
        .custom-select__label_toggle-button {
          display: flex;
          width: 24px;
          min-width: 24px;
          margin-left: auto;
        }
        .custom-select__label_toggle-button img {
          width: 100%;
          height: 100%;
        }
        .custom-select__label_text {
          color: #232628;
          font-size: 16px;
          margin-right: 10px;
        }
        .title-select {
          color: #616161;
          font-size: 15px;
          line-height: 18px;
          margin-bottom: 10px;
        }
      `}</style>

      <style jsx>{`
        .custom-select__label_toggle-button {
          transform: ${openSelectOptions ? "rotate(180deg)" : "initial"};
        }
      `}</style>
    </>
  );
};

export default Countries;
