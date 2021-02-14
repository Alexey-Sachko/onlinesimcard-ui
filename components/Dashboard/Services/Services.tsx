import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Box,
  Chip,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Paper,
  Tooltip,
  Typography,
} from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { gql } from "@apollo/client";

import { ServicesQuery, useServicesQuery } from "../../../lib/types";
import { ServiceIcon } from "./ServiceIcon";
import Star from "../../iconsComponents/Star";
import StarFilled from "../../iconsComponents/StarFilled";

export const SERVICES_QUERY = gql`
  query Services($countryCode: String!) {
    services(countryCode: $countryCode) {
      id
      code
      name
      priceAmount
      count
    }
  }
`;

export type OnBuyParams = { serviceCode: string };

export type LoadingMap = {
  [serviceCode: string]: true;
};

type ServicesProps = {
  countryCode: string;
  loadingMap: LoadingMap;
  onBuy: (params: OnBuyParams) => Promise<void>;
};

const pollInterval = 4000;

type ServicesExtend = (ServicesQuery["services"][0] & {
  isStar?: boolean;
})[];

const Services = ({ countryCode, onBuy, loadingMap }: ServicesProps) => {
  const [value, setValue] = useState("");
  const [servicesList, setServicesList] = useState([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [filteredServices, setFilteredSerfices] = useState([]);
  const classes = useStyles();

  const { data, startPolling } = useServicesQuery({
    variables: { countryCode },
    pollInterval,
    onError: () => startPolling(pollInterval),
    onCompleted: () => startPolling(pollInterval),
  });

  useEffect(() => {
    const starServiceLocalStorage =
      JSON.parse(localStorage.getItem("starsServices")) || [];

    setSelectedServices(starServiceLocalStorage);
  }, []);

  useEffect(() => {
    const newData: ServicesExtend =
      data?.services?.map((servise) => {
        if (selectedServices.includes(servise.name)) {
          return { ...servise, isStar: true };
        } else {
          return servise;
        }
      }) || [];

    setServicesList([
      ...newData.filter((service) => Boolean(service?.isStar)),
      ...newData.filter((service) => !Boolean(service?.isStar)),
    ]);
  }, [data]);

  useEffect(() => {
    if (value) {
      setFilteredSerfices(() =>
        servicesList.filter(({ name = "" }) => {
          const upperName = name.toUpperCase();
          const upperValue = value.toUpperCase();
          return upperName?.includes(upperValue);
        })
      );
    }
  }, [value]);

  const onStarService = async (nameService?: string) => {
    const isStaredService = selectedServices.includes(nameService);

    setServicesList((prevState) => {
      const newServisecList = prevState.map((servise) => {
        if (servise.name === nameService) {
          return { ...servise, isStar: !isStaredService };
        } else {
          return servise;
        }
      });

      return [
        ...newServisecList.filter((service) => Boolean(service?.isStar)),
        ...newServisecList.filter((service) => !Boolean(service?.isStar)),
      ];
    });

    setFilteredSerfices((prevState) => {
      const newServisecList = prevState.map((servise) => {
        if (servise.name === nameService) {
          return { ...servise, isStar: !isStaredService };
        } else {
          return servise;
        }
      });

      return [
        ...newServisecList.filter((service) => Boolean(service?.isStar)),
        ...newServisecList.filter((service) => !Boolean(service?.isStar)),
      ];
    });

    if (!isStaredService) {
      const newStarService = [...(selectedServices || []), nameService];
      setSelectedServices(newStarService);
      localStorage.setItem("starsServices", JSON.stringify(newStarService));
    } else {
      const newStarService =
        selectedServices.filter((service) => service !== nameService) || [];
      setSelectedServices(newStarService);
      localStorage.setItem("starsServices", JSON.stringify(newStarService));
    }
  };

  const filterHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue(value);
  };

  return (
    <>
      {/* <div className="services-title">Сервисы</div> */}
      <div className="services-filter">
        <input
          className="services-filter-input"
          value={value}
          onChange={filterHandler}
          placeholder="Сервисы"
          width="24px"
          height="24px"
        />

        {value ? (
          <img
            className="services-filter-icon"
            style={{ cursor: "pointer", marginRight: "7px" }}
            onClick={() => setValue("")}
            src="/static/reset-icon.svg"
            alt="reset-filter"
          />
        ) : (
          <img
            className="services-filter-icon"
            src="/static/ant-design_search-outlined.svg"
          />
        )}
      </div>

      <div className="number-list">
        <List
          dense
          style={{
            paddingTop: 0,
            paddingBottom: 0,
          }}
        >
          {(value ? filteredServices : servicesList)?.map(
            ({ id, name, code, priceAmount, count, isStar }, idx) => {
              const loading = loadingMap[code];

              return (
                <ListItem
                  divider={idx < data?.services.length - 1}
                  key={id}
                  className={classes.listItem}
                >
                  <div
                    onClick={() => onStarService(name)}
                    className="star-icon"
                  >
                    {isStar ? <StarFilled /> : <Star />}
                  </div>

                  <ListItemIcon>
                    <ServiceIcon code={code} />
                  </ListItemIcon>
                  <ListItemText
                    primary={<div className="service-name">{name}</div>}
                    secondary={
                      <span className={classes.countCaption}>
                        ≈ {count} шт.
                      </span>
                    }
                  />
                  <div className="services-item">
                    <div className="price-amount">{priceAmount}р.</div>

                    <Tooltip title={!loading ? "Купить" : ""} arrow>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => onBuy({ serviceCode: code })}
                        disabled={loading}
                      >
                        {!loading ? (
                          <AddShoppingCartIcon />
                        ) : (
                          <CircularProgress size={24} />
                        )}
                      </IconButton>
                    </Tooltip>
                  </div>
                </ListItem>
              );
            }
          )}
        </List>
      </div>
      <style jsx>{`
        .services-title {
          color: #616161;
          line-height: 18px;
          font-size: 15px;
          margin-bottom: 10px;
        }
        .services-item {
          display: flex;
        }
        .number-list {
          background: #fff;
          max-height: 100%;
          overflow-y: auto;
        }
        .price-amount {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 4px 8px;
          margin-right: 10px;
          font-size: 12px;
          background: #e9e8f1;
          color: #232628;
          border-radius: 6px;
        }
        .star-icon {
          display: flex;
          width: 25px;
          height: 25px;
          cursor: pointer;
          margin-right: 10px;
        }
        .service-name {
          color: #232628;
          font-weight: 400;
        }

        .services-filter {
          position: relative;
          margin-bottom: 0px;
        }

        .services-filter-input {
          padding: 5px 15px;
          border: 1px solid #f74874;
          outline: none;
          border-radius: 6px;
          color: #232628;
          font-size: 15px;
          font-weight: 300;
          line-height: 19px;
          width: 100%;
        }

        .services-filter-icon {
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
        }

        @media (max-width: 760px) {
          .number-list {
            height: calc(100% - 150px);
            max-height: initial;
          }
        }
      `}</style>
    </>
  );
};

export default Services;

const useStyles = makeStyles((theme) => ({
  countCaption: {
    color: theme.palette.grey[500],
    fontSize: "10px",
  },
  listItem: {
    paddingTop: "0px",
    paddingBottom: "0px",
    paddingRight: "20px",
    paddingLeft: "10px",
  },
}));
