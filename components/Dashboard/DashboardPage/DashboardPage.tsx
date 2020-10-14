import { gql } from "@apollo/client";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useCreateActivationMutation } from "../../../lib/types";
import { formatErrors } from "../../../utils/formatErrors";
import Countries from "../Countries";
import CurrentActivations from "../CurrentActivations";
import Services from "../Services";
import { OnBuyParams } from "../Services/Services";

export const CREATE_ACTIVATION_MUTATION = gql`
  mutation CreateActivation($createActivationInput: CreateActivationInput!) {
    createActivation(createActivationInput: $createActivationInput) {
      path
      message
    }
  }
`;

const DashboardPage = () => {
  const classes = useStyles();
  const { auth, loading } = useAuth();
  const [
    createActivation,
    { loading: createActivationLoading, error },
  ] = useCreateActivationMutation();
  const [countryCode, setCountryCode] = useState("0");

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
          alert(parsedErrors?.balanceAmount);
        } else {
          alert("Произошла ошибка");
        }
      }
    }
  };

  return (
    <Container className={classes.container}>
      {loading && !auth && <CircularProgress />}
      <Grid container spacing={3} style={{ height: "100%" }}>
        <Grid item xs={12} sm={6} md={5} lg={4}>
          <Box mb={2}>
            <Countries
              countryCode={countryCode}
              setCountryCode={setCountryCode}
            />
          </Box>
          <Services countryCode={countryCode} onBuy={onBuyHandler} />
        </Grid>

        <Grid item xs={12} sm={6} md={7} lg={8}>
          <CurrentActivations buyLoading={createActivationLoading} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    height: "calc(100% - 90px)",
  },
}));
