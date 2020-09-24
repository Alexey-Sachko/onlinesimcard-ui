import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Avatar,
  Typography,
  Box,
  Button,
  CircularProgress,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import ym from "react-yandex-metrika";

import { useStyles } from "./RegisterPage.styled";
import RegisterForm from "../RegisterForm";

const RegisterPage = () => {
  const router = useRouter();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [appError, setAppError] = useState(false);
  const [complete, setComplete] = useState(false);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        {!complete ? (
          <>
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
              Регистрация
            </Typography>
            <RegisterForm
              onStartSubmit={() => {
                setLoading(true);
                setAppError(false);
              }}
              onCompleteSubmit={() => {
                setLoading(false);
                setComplete(true);
                ym("reachGoal", "SIGNUPPED");
              }}
              onErrorSubmit={(errType) => {
                if (errType === "APP_ERROR") {
                  setAppError(true);
                }
                setLoading(false);
              }}
            />
          </>
        ) : (
          <>
            <Avatar className={classes.avatar}>
              <DoneOutlineIcon />
            </Avatar>
            <Typography component="h2" variant="h5">
              Спасибо за регистрацию
            </Typography>
            <Box mt={2} textAlign="center">
              <Typography variant="body1">
                На вашу почту отправлено письмо с сылкой для подтверждения
              </Typography>
            </Box>
            <Box mt={4}>
              <Button
                color="primary"
                variant="outlined"
                onClick={() => router.push("/signin")}
              >
                Войти
              </Button>
            </Box>
          </>
        )}
      </div>
    </Container>
  );
};

export default RegisterPage;
