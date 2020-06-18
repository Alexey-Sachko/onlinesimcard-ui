import React from "react";
import { useDispatch } from "react-redux";
import NextLink from "next/link";
import { Formik, Form, Field, FieldProps } from "formik";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

import Copyright from "../components/Copyright/Copyright";
import Header from "../components/Header";
import * as AuthService from "../services/auth/auth.service";
import { useTypedSelector } from "../redux";
import { loginUser } from "../redux/features/user";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(12),
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(20),
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  successMessage: {
    width: "100%",
    textAlign: "center",
  },
}));

type Values = {
  email: string;
  password: string;
};

export default function SigninPage() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { error, loading } = useTypedSelector((s) => s.user.login);

  const submitHandler = ({ email, password }: Values) => {
    dispatch(loginUser({ email, password }));
  };

  return (
    <>
      <Header blueBg />
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Вход
          </Typography>
          {loading && "Загрузка"}
          {error}
          <Formik
            initialValues={{ email: "", password: "" }}
            // validationSchema={SignupSchema}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={submitHandler}
          >
            {({ errors }) => (
              <Form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field name="email">
                      {({ field }: FieldProps) => {
                        return (
                          <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="Email Адрес"
                            autoComplete="email"
                            autoFocus
                            error={Boolean(errors.email)}
                            helperText={errors.email}
                            {...field}
                          />
                        );
                      }}
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="password">
                      {({ field }: FieldProps) => (
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          label="Пароль"
                          type="password"
                          autoComplete="current-password"
                          error={Boolean(errors.password)}
                          helperText={errors.password}
                          {...field}
                        />
                      )}
                    </Field>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Войти
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <NextLink href="/signup">
                      <a>Еще нет аккаунта? Регистрация</a>
                    </NextLink>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
