import React, { useState, ChangeEvent } from "react";
import {
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Tooltip,
} from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { gql } from "@apollo/client";
import Cyrillic from "cyrillic-to-translit-js";

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

const cyrillic = new Cyrillic();

const Services = ({ countryCode, onBuy, loadingMap }: ServicesProps) => {
  const [filterValue, setFilterValue] = useState("");
  const [starredServices, setStarredServices] = useState<string[]>([]);
  const classes = useStyles();

  const { data, startPolling } = useServicesQuery({
    variables: { countryCode },
    pollInterval,
    onError: () => startPolling(pollInterval),
    onCompleted: () => startPolling(pollInterval),
  });

  const servicesList = React.useMemo(() => {
    const newData: ServicesExtend =
      data?.services?.map((service) => {
        if (starredServices.includes(service.code)) {
          return { ...service, isStar: true };
        } else {
          return service;
        }
      }) || [];

    const upperValue = filterValue.toUpperCase();

    const filtered = newData
      .filter(({ name = "", code }) => {
        if (code === "ot") {
          return true;
        }

        const upperName = name.toUpperCase();
        return (
          upperName.includes(upperValue) ||
          upperName.includes(cyrillic.transform(upperValue)) ||
          upperName.includes(cyrillic.reverse(upperValue)) ||
          cyrillic.transform(upperName).includes(upperValue) ||
          cyrillic.reverse(upperName).includes(upperValue)
        );
      })
      .sort((a, b) => {
        if (a.isStar && b.isStar) {
          return 0;
        } else if (a.isStar) {
          return -1;
        } else if (b.isStar) {
          return 1;
        }
      });

    return filtered;
  }, [filterValue, data, starredServices]);

  const onStarService = async (code: string) => {
    setStarredServices((prev) => {
      const isStarred = prev.some((item) => item === code);
      if (isStarred) {
        return prev.filter((item) => item !== code);
      }

      return [...prev, code];
    });
  };

  const filterHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilterValue(value);
  };

  React.useEffect(() => {
    const fromPersist = getFromPersistServices();
    setStarredServices(fromPersist);
  }, []);

  React.useEffect(() => {
    setPersistServices(starredServices);
  }, [starredServices]);

  return (
    <>
      <div className="services-filter">
        <input
          className="services-filter-input"
          value={filterValue}
          onChange={filterHandler}
          placeholder="Сервисы"
          width="24px"
          height="24px"
        />

        {filterValue ? (
          <img
            className="services-filter-icon"
            style={{ cursor: "pointer", marginRight: "7px" }}
            onClick={() => setFilterValue("")}
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
          {servicesList.map(
            ({ id, name, code, priceAmount, count, isStar }, idx) => {
              const loading = loadingMap[code];

              return (
                <ListItem
                  divider={idx < data?.services.length - 1}
                  key={id}
                  className={classes.listItem}
                >
                  <div
                    onClick={() => onStarService(code)}
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

const SERVICES_PERSIST_KEY = "starredServices2";

function setPersistServices(codes: string[]) {
  const str = JSON.stringify(codes);
  localStorage.setItem(SERVICES_PERSIST_KEY, str);
}

function getFromPersistServices(): string[] {
  try {
    return JSON.parse(localStorage.getItem(SERVICES_PERSIST_KEY)) || [];
  } catch (err) {
    console.log(err);
    return [];
  }
}
