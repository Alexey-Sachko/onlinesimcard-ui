import React from "react"
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
} from "@material-ui/core"
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart"
import { gql } from "@apollo/client"

import { useServicesQuery } from "../../../lib/types"
import { ServiceIcon } from "./ServiceIcon"

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
`

export type OnBuyParams = { serviceCode: string }

export type LoadingMap = {
  [serviceCode: string]: true
}

type ServicesProps = {
  countryCode: string
  loadingMap: LoadingMap
  onBuy: (params: OnBuyParams) => Promise<void>
}

const pollInterval = 4000

const Services = ({ countryCode, onBuy, loadingMap }: ServicesProps) => {
  const classes = useStyles()

  const { data, startPolling } = useServicesQuery({
    variables: { countryCode },
    pollInterval,
    onError: () => startPolling(pollInterval),
    onCompleted: () => startPolling(pollInterval),
  })

  return (
    <Box height="100%">
      <Box px={2} py={1}>
        <Typography>Сервисы</Typography>
      </Box>

      <Paper style={{ height: "calc(100% - 30px)" }}>
        <List dense style={{ height: "100%", overflowY: "auto" }}>
          {data?.services.map(({ id, name, code, priceAmount, count }, idx) => {
            const loading = loadingMap[code]

            return (
              <ListItem divider={idx < data?.services.length - 1} key={id}>
                <ListItemIcon>
                  <ServiceIcon code={code} />
                </ListItemIcon>
                <ListItemText
                  primary={name}
                  secondary={
                    <span className={classes.countCaption}>≈ {count} шт.</span>
                  }
                />
                <ListItemSecondaryAction>
                  <Box width="50px" display="inline-block">
                    <Chip
                      size="small"
                      variant="outlined"
                      label={<>{priceAmount}р.</>}
                    />
                  </Box>
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
                </ListItemSecondaryAction>
              </ListItem>
            )
          })}
        </List>
      </Paper>
    </Box>
  )
}

export default Services

const useStyles = makeStyles((theme) => ({
  countCaption: {
    color: theme.palette.grey[400],
    fontSize: "10px",
  },
}))
