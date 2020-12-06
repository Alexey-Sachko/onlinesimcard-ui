import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Link,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import {
  DoneOutline as DoneOutlineIcon,
  LockOutlined as LockOutlinedIcon,
} from "@material-ui/icons";
import React from "react";
import { useRouter } from "next/router";

import { useRegisterPageStyles } from "../Register/RegisterPage/RegisterPage.styled";
import ForgotPasswordForm from "./ForgotPasswordForm";

const ForgotPasswordPage = () => {
  const classes = useRegisterPageStyles();
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);
  const [appError, setAppError] = React.useState(false);
  const [retryAfter, setRetryAfter] = React.useState<string | null>(null);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        {!retryAfter ? (
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
              Восстановление пароля
            </Typography>
            <ForgotPasswordForm
              onStartSubmit={() => {
                setLoading(true);
                setAppError(false);
              }}
              onCompleteSubmit={(accessAgainAfter) => {
                setLoading(false);
                setRetryAfter(accessAgainAfter);
              }}
              onErrorSubmit={(errType) => {
                if (errType === "APP_ERROR") {
                  setAppError(true);
                }
                setLoading(false);
              }}
              onErrorTryAfter={(accessAgainAfter) => {
                setRetryAfter(accessAgainAfter);
              }}
            />
          </>
        ) : (
          <>
            <Avatar className={classes.avatar}>
              <DoneOutlineIcon />
            </Avatar>
            <Typography component="h2" variant="h5">
              Восстановление пароля
            </Typography>
            <Box mt={2} textAlign="center">
              <Alert>
                Cсылка на сброс пароля была отправлена на указанную вами почту!
              </Alert>
            </Box>

            <Box mt={4}>
              <Button
                color="secondary"
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

export default ForgotPasswordPage;
