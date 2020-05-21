import React, { useState } from "react";
import Link from "next/link";
import { Formik, Form, Field, FieldProps } from "formik";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import * as Yup from "yup";
import clsx from "clsx";

import Copyright from "../components/Copyright/Copyright";
import Header from "../components/Header";

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
  avatarSuccess: {
    backgroundColor: theme.palette.success.main,
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
  repassword: string;
};

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Некорректный Email").required("Поле обязательное"),
  password: Yup.string()
    .required("Поле обязательное")
    .min(4, "Пароль должен быть не менее 4 символов")
    .max(15, "Пароль должен быть не более 15 символов"),
  // .test(
  //   "password",
  //   "Пароль должен состоять из латинских букв, цифр и символов -",
  //   function (value) {
  //     return !/[^a-zA-Z]/.test(value);
  //   }
  // ),
  // .matches(/[a-zA-Z]/, "Пароль должен включать в себя латинские буквы"),
  repassword: Yup.string()
    // .required("Пароли должны совпадать")
    .test("passwords-match", "Пароли должны совпадать", function (value) {
      return this.parent.password === value;
    }),
});

export default function SignUp() {
  const classes = useStyles();
  const [isSignuped, setIsSignuped] = useState(false);

  const submitHandler = (values: Values) => {
    console.log(values);
    setIsSignuped(true);
  };

  return (
    <>
      <Header blueBg />
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar
            className={clsx(classes.avatar, {
              [classes.avatarSuccess]: isSignuped,
            })}
          >
            {isSignuped ? <DoneOutlineIcon /> : <LockOutlinedIcon />}
          </Avatar>
          <Typography component="h1" variant="h5">
            {isSignuped ? "Вы зарегистрированы" : "Регистрация"}
          </Typography>
          {isSignuped && (
            <Box mt={4}>
              <Typography variant="h6" className={classes.successMessage}>
                На вашу почту отправлено письмо для подтвержения.
              </Typography>
              <Box mt={3}>
                <Link href="/">
                  <a style={{ textDecoration: "none" }}>
                    <Button color="primary" fullWidth variant="contained">
                      Хорошо
                    </Button>
                  </a>
                </Link>
              </Box>
            </Box>
          )}
          {!isSignuped && (
            <Formik
              initialValues={{ email: "", password: "", repassword: "" }}
              validationSchema={SignupSchema}
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
                    <Grid item xs={12}>
                      <Field name="repassword">
                        {({ field }: FieldProps) => (
                          <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="Повторите Пароль"
                            type="password"
                            error={Boolean(errors.repassword)}
                            helperText={errors.repassword}
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
                    Зарегистрироваться
                  </Button>
                  {/* <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid> */}
                </Form>
              )}
            </Formik>
          )}
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
