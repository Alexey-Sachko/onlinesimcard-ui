import React, { useState } from "react";
import { gql } from "@apollo/client";
import {
  Box,
  Container,
  Grid,
  Hidden,
  LinearProgress,
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
import { LoadingMap, OnBuyParams } from "../Services";
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
  const tabsClasses = useTabsStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { auth, loading } = useAuth();
  const [
    createActivation,
    { loading: createActivationLoading, error },
  ] = useCreateActivationMutation();
  const [countryCode, setCountryCode] = useState("0");
  const [tabIndex, setTabIndex] = useState(TabIndex.Services);
  const [loadingMap, setLoadingMap] = useState<LoadingMap>({});

  const setLoading = (serviceCode: string, value: boolean) => {
    setLoadingMap((prev) => {
      if (prev[serviceCode] === value) {
        return prev;
      }

      const next = { ...prev };
      if (!value) {
        delete next[serviceCode];
      } else {
        next[serviceCode] = true;
      }

      return next;
    });
  };

  const onBuyHandler = async (params: OnBuyParams) => {
    if (!createActivationLoading) {
      setLoading(params.serviceCode, true);
      const res = await createActivation({
        variables: {
          createActivationInput: {
            countryCode,
            serviceCode: params.serviceCode,
          },
        },
      });

      setLoading(params.serviceCode, false);

      const errors = res.data?.createActivation;

      if (errors) {
        const parsedErrors = formatErrors(errors);
        if (parsedErrors?.balanceAmount) {
          enqueueSnackbar(parsedErrors.balanceAmount, { variant: "warning" });
        } else if (parsedErrors?.NO_NUMBERS) {
          enqueueSnackbar(
            "Для данного сервиса уже купили все номера, попробуйте позже",
            {
              variant: "warning",
            }
          );
        } else {
          enqueueSnackbar("Произошла ошибка", { variant: "error" });
        }
      } else if (res.errors) {
        enqueueSnackbar("Произошла ошибка", { variant: "error" });
      } else {
        enqueueSnackbar("Номер заказан", { variant: "success" });
        window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
        setTabIndex(TabIndex.Activations);
      }
    }
  };

  const servicesJSX = (
    <>
      <Box mb={1}>
        <Countries countryCode={countryCode} setCountryCode={setCountryCode} />
      </Box>
      <Box height="calc(100% - 55px)">
        <Services
          countryCode={countryCode}
          onBuy={onBuyHandler}
          loadingMap={loadingMap}
        />
      </Box>
    </>
  );

  const currentActivationsJSX = (
    <CurrentActivations buyLoading={createActivationLoading} />
  );

  return (
    <Container className={classes.container}>
      <Box height="4px">{loading && !auth && <LinearProgress />}</Box>
      <Hidden smDown>
        <Grid container spacing={3} style={{ height: "100%" }}>
          <Grid item xs={12} sm={4} md={4} lg={3} style={{ height: "100%" }}>
            {servicesJSX}
          </Grid>

          <Grid item xs={12} sm={8} md={8} lg={9} style={{ height: "100%" }}>
            {currentActivationsJSX}
          </Grid>
        </Grid>
      </Hidden>
      <Hidden mdUp>
        <Tabs
          classes={tabsClasses}
          value={tabIndex}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          centered
          onChange={(_, value) => setTabIndex(value)}
          aria-label="disabled tabs example"
        >
          <Tab
            className={classes.tab}
            label={
              <Box display="flex" alignItems="center">
                <PublicIcon />{" "}
                <span style={{ marginLeft: "7px" }}>Сервисы</span>
              </Box>
            }
          />
          <Tab
            className={classes.tab}
            label={
              <Box display="flex" alignItems="center">
                <MessageIcon />{" "}
                <span style={{ marginLeft: "7px" }}>Операции</span>
              </Box>
            }
          />
        </Tabs>
        <Box mt={2} height="calc(100% - 55px)">
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
    marginTop: theme.spacing(2),
    height: "calc(100% - 80px)",

    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(1),
    },
  },
  tab: {
    padding: 0,
    minHeight: "0px",
  },
}));

const useTabsStyles = makeStyles(() => ({
  root: {
    minHeight: "30px",
  },
}));
