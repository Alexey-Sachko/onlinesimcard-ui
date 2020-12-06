import { gql } from "@apollo/client";
import { Button, TextField } from "@material-ui/core";
import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import React from "react";

import { useResetPasswordMutation } from "../../lib/types";
import { useRegisterFormStyles } from "../Register/RegisterForm/RegisterForm.styled";
import { ForgotPasswordSchema, ForgotPasswordFormState } from "./schema";

export const ResetPasswordMutation = gql`
  mutation ResetPassword($resetPassInput: ResetPassInput!) {
    resetPassword(resetPassInput: $resetPassInput) {
      accessAgain
      error {
        path
        message
      }
    }
  }
`;

export type ForgotPasswordFormProps = {
  onStartSubmit?: () => void;
  onCompleteSubmit?: (accessAgainAfter: string) => void;
  onErrorSubmit?: (type: "VALIDATION_ERROR" | "APP_ERROR") => void;
  onErrorTryAfter: (afterTime: string) => void;
};

const ForgotPasswordForm = ({
  onCompleteSubmit,
  onErrorSubmit,
  onStartSubmit,
  onErrorTryAfter,
}: ForgotPasswordFormProps) => {
  const classes = useRegisterFormStyles();
  const [resetPassword] = useResetPasswordMutation();

  const submitHandler = async (
    values: ForgotPasswordFormState,
    helpers: FormikHelpers<ForgotPasswordFormState>
  ) => {
    onStartSubmit && onStartSubmit();

    try {
      const { data, errors: gqlErrors } = await resetPassword({
        variables: {
          resetPassInput: {
            email: values.email,
          },
        },
      });

      const forgotFail = data?.resetPassword.error;

      if (forgotFail) {
        const { path, message } = forgotFail;

        if (path === "email") {
          helpers.setErrors({ email: message });
        } else if (path === "WAIT_TIMEOUT_TO_CREATE_AGAIN") {
          onErrorTryAfter(message);
        }
        onErrorSubmit && onErrorSubmit("VALIDATION_ERROR");
      } else if (gqlErrors) {
        onErrorSubmit && onErrorSubmit("APP_ERROR");
      } else if (!forgotFail) {
        onCompleteSubmit(data.resetPassword.accessAgain);
      }
    } catch (error) {
      onErrorSubmit && onErrorSubmit("APP_ERROR");
    }
  };

  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={submitHandler}
      validationSchema={ForgotPasswordSchema}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ errors, isSubmitting }) => (
        <Form className={classes.form} noValidate>
          <Field name="email">
            {({ field }: FieldProps) => (
              <TextField
                variant="outlined"
                margin="normal"
                size="small"
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

          <Button
            type="submit"
            size="small"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            disabled={isSubmitting}
          >
            Сбросить пароль
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ForgotPasswordForm;
