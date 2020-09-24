import React from "react";
import Header from "../components/blocks/Header";
import { makeStyles, Container, Typography } from "@material-ui/core";
import { useMe } from "../hooks/useMe";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const me = useMe();

  let userName: string | undefined = undefined;

  if (me) {
    if (me.email) {
      userName = me.email;
    } else if (me.lastName) {
      userName = `${me.firstName} ${me.lastName}`;
    } else {
      userName = `no name`;
    }
  }

  return (
    <>
      <Header userName={userName} />
      <Container className={classes.container}>
        <Typography variant="h4" align="center">
          Сайт еще в разработке
        </Typography>
      </Container>
    </>
  );
};

export default Dashboard;
