import React from "react";
import Header from "../components/blocks/Header";
import { makeStyles, Container, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  return (
    <>
      <Header userName="Вы" />
      <Container className={classes.container}>
        <Typography variant="h4" align="center">
          Сайт еще в разработке
        </Typography>
      </Container>
    </>
  );
};

export default Dashboard;
