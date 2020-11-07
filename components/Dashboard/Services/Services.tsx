import React from "react";
import {
  Box,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from "@material-ui/core";
import ShopIcon from "@material-ui/icons/Shop";
import { gql } from "@apollo/client";

import { useServicesQuery } from "../../../lib/types";
import { ServiceIcon } from "./ServiceIcon";

export const SERVICES_QUERY = gql`
  query Services($countryCode: String!) {
    services(countryCode: $countryCode) {
      id
      code
      name
      priceAmount
    }
  }
`;

export type OnBuyParams = { serviceCode: string };

type ServicesProps = {
  countryCode: string;
  onBuy: (params: OnBuyParams) => Promise<void>;
};

const Services = ({ countryCode, onBuy }: ServicesProps) => {
  const { data } = useServicesQuery({ variables: { countryCode } });

  return (
    <Box height="100%">
      <Box px={2} py={1}>
        <Typography>Сервисы</Typography>
      </Box>

      <Paper style={{ height: "calc(100% - 30px)" }}>
        <List dense style={{ height: "100%", overflowY: "auto" }}>
          {data?.services.map(({ id, name, code, priceAmount }, idx) => {
            return (
              <ListItem divider={idx < data?.services.length - 1} key={id}>
                <ListItemIcon>
                  <ServiceIcon code={code} />
                </ListItemIcon>
                <ListItemText>{name}</ListItemText>
                <ListItemSecondaryAction>
                  <Box width="50px" display="inline-block">
                    <Chip
                      size="small"
                      variant="outlined"
                      label={<>{priceAmount}р.</>}
                    />
                  </Box>
                  <Tooltip title="Купить">
                    <IconButton
                      size="small"
                      onClick={() => onBuy({ serviceCode: code })}
                    >
                      <ShopIcon />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </Paper>
    </Box>
  );
};

export default Services;
