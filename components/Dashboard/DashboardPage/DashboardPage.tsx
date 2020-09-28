import {
  CircularProgress,
  Container,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { useAuth } from "../../../hooks/useAuth";

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
    </Container>
  );
};

export default DashboardPage;
