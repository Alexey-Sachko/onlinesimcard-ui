import {
  Box,
  CircularProgress,
  Container,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import Countries from "../Countries";
import Services from "../Services";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
}));

const DashboardPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const { auth, loading } = useAuth();
  const [countryCode, setCountryCode] = useState("0");

  return (
    <Container className={classes.container}>
      {loading && !auth && <CircularProgress />}
      <Grid container>
        <Grid item xs={12} sm={6} md={5} lg={4}>
          <Box mb={2}>
            <Countries
              countryCode={countryCode}
              setCountryCode={setCountryCode}
            />
          </Box>
          <Services countryCode={countryCode} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;
