import React from "react";
import { gql } from "@apollo/client";
import { TextField, Button, Grid, Link } from "@material-ui/core";
import { FormikHelpers, Formik, Form, Field, FieldProps } from "formik";

import { formatErrors } from "../../utils/formatErrors";
import { useStyles } from "../Register/RegisterForm/RegisterForm.styled";
import { LoginFormState, LoginSchema } from "./schema";
import { useLoginMutation } from "../../lib/types";

export const LoginMutation = gql`
  mutation Login($authCredentialsDto: AuthCredentialsDto!) {
    login(authCredentialsDto: $authCredentialsDto) {
      path
      message
    }
  }
`;

type ErrorState = Partial<Record<keyof LoginFormState, string>>;

type LoginFormProps = {
  onStartSubmit?: () => void;
  onCompleteSubmit?: () => void;
  onErrorSubmit?: (type: "VALIDATION_ERROR" | "APP_ERROR") => void;
};

const LoginForm = ({
  onStartSubmit,
  onCompleteSubmit,
  onErrorSubmit,
}: LoginFormProps) => {
  const classes = useStyles();
  const [login] = useLoginMutation();

  const submitHandler = async (
    values: LoginFormState,
    helpers: FormikHelpers<LoginFormState>
  ) => {
    onStartSubmit && onStartSubmit();

    try {
      const {
        data: { login: loginErrors },
        errors: gqlErrors,
      } = await login({
        variables: {
          authCredentialsDto: {
            email: values.email,
            password: values.password,
          },
        },
      });

      if (loginErrors) {
        helpers.setErrors(formatErrors<ErrorState>(loginErrors));
        onErrorSubmit && onErrorSubmit("VALIDATION_ERROR");
      } else if (gqlErrors) {
        onErrorSubmit && onErrorSubmit("APP_ERROR");
      } else if (loginErrors) {
        onCompleteSubmit();
      }
    } catch (error) {
      onErrorSubmit && onErrorSubmit("APP_ERROR");
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "", repassword: "" }}
      onSubmit={submitHandler}
      validationSchema={LoginSchema}
    >
      {({ errors, isSubmitting }) => (
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
                error={Boolean(errors.email)}
                helperText={errors.email}
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
                error={Boolean(errors.password)}
                helperText={errors.password}
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
            disabled={isSubmitting}
          >
            Войти
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link href="/signup" variant="body2">
                Еще нет аккаунта ? Регистрация
              </Link>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
