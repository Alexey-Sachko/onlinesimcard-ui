import React from "react";
import { gql } from "@apollo/client";
import { TextField, Button, Typography, Box } from "@material-ui/core";

import { RegisterFormState, RegisterSchema } from "../schema";
import { useRegisterMutation } from "../../../lib/types";
import { FormikHelpers, Formik, Form, Field, FieldProps } from "formik";
import { formatErrors } from "../../../utils/formatErrors";
import { useStyles } from "./RegisterForm.styled";
import VkIcon from "./VkIcon";

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
  onStartSubmit?: () => void;
  onCompleteSubmit?: () => void;
  onErrorSubmit?: (type: "VALIDATION_ERROR" | "APP_ERROR") => void;
};

const RegisterForm = ({
  onStartSubmit,
  onCompleteSubmit,
  onErrorSubmit,
}: RegisterFormProps) => {
  const classes = useStyles();
  const [register] = useRegisterMutation();

  const submitHandler = async (
    values: RegisterFormState,
    helpers: FormikHelpers<RegisterFormState>
  ) => {
    onStartSubmit && onStartSubmit();

    try {
      const {
        data: {
          register: { errors, result },
        },
        errors: gqlErrors,
      } = await register({
        variables: {
          userSignupDto: { email: values.email, password: values.password },
        },
      });

      if (errors) {
        helpers.setErrors(formatErrors<ErrorState>(errors));
        onErrorSubmit && onErrorSubmit("VALIDATION_ERROR");
      } else if (gqlErrors) {
        onErrorSubmit && onErrorSubmit("APP_ERROR");
      } else if (result) {
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
      validationSchema={RegisterSchema}
      validateOnChange={false}
      validateOnBlur={false}
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
                size="small"
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
                size="small"
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
                size="small"
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
            color="secondary"
            size="small"
            className={classes.submit}
            disabled={isSubmitting}
          >
            Зарегистрироваться
          </Button>

          <Box>
            <Typography align="center">Или войти через</Typography>
          </Box>

          <Button
            className={classes.submit}
            fullWidth
            color="primary"
            size="small"
            variant="contained"
            startIcon={<VkIcon />}
          >
            Вконтакте
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
