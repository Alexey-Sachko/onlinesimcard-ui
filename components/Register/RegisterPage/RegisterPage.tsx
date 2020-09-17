import React from "react";
import {
  Container,
  TextField,
  Avatar,
  Typography,
  Button,
  Box,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Formik, Form, Field, FieldProps } from "formik";

import Copyright from "../../blocks/Copyright";
import { useStyles } from "./RegisterPage.styled";

const RegisterPage = () => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>
        <Formik
          initialValues={{ email: "", password: "", repassword: "" }}
          onSubmit={() => console.log("submit")}
        >
          {() => (
            <Form className={classes.form} noValidate>
              <Field name="email">
                {({ field }: FieldProps) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Email адрес"
                    autoComplete="email"
                    autoFocus
                    {...field}
                  />
                )}
              </Field>
              <Field name="password">
                {({ field }: FieldProps) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Пароль"
                    type="password"
                    autoComplete="current-password"
                    {...field}
                  />
                )}
              </Field>

              <Field name="repassword">
                {({ field }: FieldProps) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Подтвердите пароль"
                    type="password"
                    {...field}
                  />
                )}
              </Field>

              {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> */}
            </Form>
          )}
        </Formik>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default RegisterPage;
