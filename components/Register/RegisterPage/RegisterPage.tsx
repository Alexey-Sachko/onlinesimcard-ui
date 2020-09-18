import React, { useState } from "react";
import { Container, Avatar, Typography, Box } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import Copyright from "../../blocks/Copyright";
import { useStyles } from "./RegisterPage.styled";
import RegisterForm from "../RegisterForm";

const RegisterPage = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Регистрация {loading && "loading"}
        </Typography>
        <RegisterForm onLoadingChange={setLoading} />
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default RegisterPage;
