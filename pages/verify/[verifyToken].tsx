import React, { useEffect, useState } from "react";
import Head from "next/head";
import {
  CircularProgress,
  Grid,
  Typography,
  Box,
  Container,
  Button,
} from "@material-ui/core";
import { useRouter } from "next/router";
import { gql } from "@apollo/client";

import Header from "../../components/blocks/Header";
import { useVerifyUserMutation } from "../../lib/types";

export const VERIFY_USER_MUTATION = gql`
  mutation VerifyUser($verifyToken: String!) {
    verifyUser(verifyToken: $verifyToken) {
      path
      message
    }
  }
`;

const Verify = () => {
  const router = useRouter();
  const [submitVerify, { data, loading }] = useVerifyUserMutation();
  const [isVerified, setIsVerified] = useState(true);
  const verifyErr = data?.verifyUser;

  useEffect(() => {
    const verifyParam = router.query.verifyToken;
    const verifyToken = Array.isArray(verifyParam)
      ? verifyParam[0]
      : verifyParam;

    (async () => {
      const {
        data: { verifyUser: _verifyUserError },
      } = await submitVerify({ variables: { verifyToken } });

      if (!_verifyUserError) {
        setIsVerified(true);
      }
    })();
  }, []);

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <Header />
      <Box pt={5}>
        <Container>
          <Grid container justify="center">
            <Grid item>
              {isVerified ? (
                <>
                  <Box mb={5}>
                    <Typography variant="h5">
                      Учетная запись подтверждена
                    </Typography>
                  </Box>
                  <Grid container justify="center">
                    <Grid item>
                      <Button variant="contained" color="primary">
                        Войти
                      </Button>
                    </Grid>
                  </Grid>{" "}
                </>
              ) : (
                <>
                  <Box mb={5}>
                    <Typography variant="h5" align="center">
                      Подтверждение учетной записи
                    </Typography>
                  </Box>
                  <Grid container justify="center">
                    <Grid item>
                      {loading && <CircularProgress size={50} />}
                      {verifyErr && verifyErr.message}
                    </Grid>
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Verify;
