import React, { useState } from "react";
import { gql } from "@apollo/client";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Hidden,
  makeStyles,
  Tab,
  Tabs,
} from "@material-ui/core";
import PublicIcon from "@material-ui/icons/Public";
import MessageIcon from "@material-ui/icons/Message";
import { useSnackbar } from "notistack";

import { useAuth } from "../../../hooks/useAuth";
import { useCreateActivationMutation } from "../../../lib/types";
import { formatErrors } from "../../../utils/formatErrors";
import Countries from "../Countries";
import CurrentActivations from "../CurrentActivations";
import Services from "../Services";
import { OnBuyParams } from "../Services/Services";
import { TabIndex } from "./tab-index.enum";

export const CREATE_ACTIVATION_MUTATION = gql`
  mutation CreateActivation($createActivationInput: CreateActivationInput!) {
    createActivation(createActivationInput: $createActivationInput) {
      path
      message
    }
  }
`;

const Activations = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { auth, loading } = useAuth();
  const [
    createActivation,
    { loading: createActivationLoading, error },
  ] = useCreateActivationMutation();
  const [countryCode, setCountryCode] = useState("0");
  const [tabIndex, setTabIndex] = useState(TabIndex.Services);

  const onBuyHandler = async (params: OnBuyParams) => {
    if (!createActivationLoading) {
      const res = await createActivation({
        variables: {
          createActivationInput: {
            countryCode,
            serviceCode: params.serviceCode,
          },
        },
      });

      const errors = res.data?.createActivation;

      if (errors) {
        const parsedErrors = formatErrors(errors);
        if (parsedErrors?.balanceAmount) {
          enqueueSnackbar(parsedErrors.balanceAmount, { variant: "warning" });
        } else {
          enqueueSnackbar("Произошла ошибка", { variant: "error" });
        }
      } else if (res.errors) {
        enqueueSnackbar("Произошла ошибка", { variant: "error" });
      }
    }
  };

  const servicesJSX = (
    <>
      <Box mb={2}>
        <Countries countryCode={countryCode} setCountryCode={setCountryCode} />
      </Box>
      <Services countryCode={countryCode} onBuy={onBuyHandler} />
    </>
  );

  const currentActivationsJSX = (
    <CurrentActivations buyLoading={createActivationLoading} />
  );

  return (
    <Container className={classes.container}>
      {loading && !auth && <CircularProgress />}
      <Hidden smDown>
        <Grid container spacing={3} style={{ height: "100%" }}>
          <Grid item xs={12} sm={4} md={4} lg={3}>
            {servicesJSX}
          </Grid>

          <Grid item xs={12} sm={8} md={8} lg={9}>
            {currentActivationsJSX}
          </Grid>
        </Grid>
      </Hidden>
      <Hidden mdUp>
        <Tabs
          value={tabIndex}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          centered
          onChange={(_, value) => setTabIndex(value)}
          aria-label="disabled tabs example"
        >
          <Tab
            label={
              <Box display="flex" alignItems="center">
                <PublicIcon />{" "}
                <span style={{ marginLeft: "7px" }}>Сервисы</span>
              </Box>
            }
          />
          <Tab
            label={
              <Box display="flex" alignItems="center">
                <MessageIcon />{" "}
                <span style={{ marginLeft: "7px" }}>Операции</span>
              </Box>
            }
          />
        </Tabs>
        <Box mt={3}>
          {tabIndex === TabIndex.Services && servicesJSX}
          {tabIndex === TabIndex.Activations && currentActivationsJSX}
        </Box>
      </Hidden>
    </Container>
  );
};

export default Activations;

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    minHeight: "calc(100% - 90px)",
  },
}));