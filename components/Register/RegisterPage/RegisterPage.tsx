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
import { Formik, Form, Field, FieldProps, FormikHelpers } from "formik";
import { gql } from "@apollo/client";

import { useRegisterMutation } from "../../../lib/types";
import Copyright from "../../blocks/Copyright";
import { useStyles } from "./RegisterPage.styled";
import { RegisterFormState, RegisterSchema } from "../schema";
import { formatErrors } from "../../../utils/formatErrors";

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

const RegisterPage = () => {
  const classes = useStyles();

  const [register, { loading }] = useRegisterMutation();

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
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Регистрация {loading && "loading"}
        </Typography>
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
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default RegisterPage;
