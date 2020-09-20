import React, { useState } from "react";
import {
  Container,
  Avatar,
  Typography,
  Box,
  CircularProgress,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useRouter } from "next/router";

import { useStyles } from "../Register/RegisterPage/RegisterPage.styled";
import LoginForm from "./LoginForm";

const RegisterPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [appError, setAppError] = useState(false);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        {loading ? (
          <Box m={1}>
            <CircularProgress size={35} />
          </Box>
        ) : (
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
        )}
        <Typography component="h1" variant="h5">
          Вход
        </Typography>
        <LoginForm
          onStartSubmit={() => {
            setLoading(true);
            setAppError(false);
          }}
          onCompleteSubmit={() => {
            setLoading(false);
            router.push("/dashboard");
          }}
          onErrorSubmit={(errType) => {
            if (errType === "APP_ERROR") {
              setAppError(true);
            }
            setLoading(false);
          }}
        />
      </div>
    </Container>
  );
};

export default RegisterPage;
