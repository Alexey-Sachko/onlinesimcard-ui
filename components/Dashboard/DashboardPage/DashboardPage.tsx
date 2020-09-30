import {
  CircularProgress,
  Container,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { useAuth } from "../../../hooks/useAuth";
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

  return (
    <Container className={classes.container}>
      {loading && !auth && <CircularProgress />}
      <Grid container>
        <Grid item xs={3}>
          <Services />
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;
