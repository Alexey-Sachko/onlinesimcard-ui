import React, { useEffect } from "react";
import { gql } from "@apollo/client";

import { RegisterFormState, RegisterSchema } from "../schema";
import { useRegisterMutation } from "../../../lib/types";
import { FormikHelpers, Formik, Form, Field, FieldProps } from "formik";
import { formatErrors } from "../../../utils/formatErrors";
import classes from "*.module.css";
import { TextField, Button } from "@material-ui/core";

export const RegisterMutation = gql`
  mutation Register($userSignupDto: UserSignupDto!) {
    register(userSignupDto: $userSignupDto) {
      result
      errors {
        path
        message
      }
    }
  }
`;

type ErrorState = Partial<Record<keyof RegisterFormState, string>>;

type RegisterFormProps = {
  onLoadingChange?: (value: boolean) => void;
};

const RegisterForm = ({ onLoadingChange }: RegisterFormProps) => {
  const [register, { loading }] = useRegisterMutation();

  useEffect(() => {
    onLoadingChange && onLoadingChange(loading);
  }, [loading]);

  const submitHandler = (
    values: RegisterFormState,
    helpers: FormikHelpers<RegisterFormState>
  ) => {
    register({
      variables: {
        userSignupDto: { email: values.email, password: values.password },
      },
    }).then(({ data: { register: { errors } } }) =>
      helpers.setErrors(formatErrors<ErrorState>(errors))
    );
  };

  return (
    <Formik
      initialValues={{ email: "", password: "", repassword: "" }}
      onSubmit={submitHandler}
      validationSchema={RegisterSchema}
    >
      {({ errors }) => (
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

          <Field name="repassword">
            {({ field }: FieldProps) => (
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Подтвердите пароль"
                type="password"
                error={Boolean(errors.repassword)}
                helperText={errors.repassword}
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
  );
};

export default RegisterForm;
