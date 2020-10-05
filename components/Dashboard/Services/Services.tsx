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
    }
  }
`;

type ServicesProps = {
  countryCode: string;
};

const Services = ({ countryCode }: ServicesProps) => {
  const { data } = useServicesQuery({ variables: { countryCode } });

  return (
    <Box>
      <Box px={3} py={1}>
        <Typography>Сервисы</Typography>
      </Box>

      <Paper>
        <List dense>
          {data?.services.map(({ id, name, code }, idx) => {
            const price = 25;

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
                      label={<>{price}р.</>}
                    />
                  </Box>
                  <Tooltip title="Купить">
                    <IconButton size="small">
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
