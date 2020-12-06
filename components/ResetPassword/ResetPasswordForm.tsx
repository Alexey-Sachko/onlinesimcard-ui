import { gql } from "@apollo/client";
import { TextField, Button, Grid, Link, Hidden } from "@material-ui/core";
import { Formik, Form, Field, FieldProps, FormikHelpers } from "formik";
import React from "react";
import { useResetPasswordConfirmMutation } from "../../lib/types";

import { useRegisterFormStyles } from "../Register/RegisterForm/RegisterForm.styled";
import { ResetPasswordFormState, ResetPasswordSchema } from "./schema";

export const ResetPasswordConfirmMutation = gql`
  mutation ResetPasswordConfirm(
    $resetPassConfirmInput: ResetPassConfirmInput!
  ) {
    resetPasswordConfirm(resetPassConfirmInput: $resetPassConfirmInput) {
      path
      message
    }
  }
`;

type ResetPasswordFormProps = {
  onStartSubmit?: () => void;
  onCompleteSubmit?: () => void;
  onErrorSubmit?: (type: "VALIDATION_ERROR" | "APP_ERROR") => void;
  onInvalidToken: () => void;
  tokenId: string;
};

const ResetPasswordForm = ({
  onStartSubmit,
  onErrorSubmit,
  onCompleteSubmit,
  onInvalidToken,
  tokenId,
}: ResetPasswordFormProps) => {
  const classes = useRegisterFormStyles();
  const [resetPasswordConfirm] = useResetPasswordConfirmMutation();

  const submitHandler = async (
    values: ResetPasswordFormState,
    helpers: FormikHelpers<ResetPasswordFormState>
  ) => {
    onStartSubmit && onStartSubmit();

    try {
      const { data, errors: gqlErrors } = await resetPasswordConfirm({
        variables: {
          resetPassConfirmInput: { newPassword: values.password, tokenId },
        },
      });

      const clientFail = data?.resetPasswordConfirm;

      if (clientFail && clientFail.path === "tokenId") {
        onInvalidToken();
      } else if (gqlErrors) {
        onErrorSubmit && onErrorSubmit("APP_ERROR");
      } else {
        onCompleteSubmit();
      }
    } catch (error) {
      onErrorSubmit && onErrorSubmit("APP_ERROR");
    }
  };

  return (
    <Formik
      initialValues={{ password: "", repassword: "" }}
      onSubmit={submitHandler}
      validationSchema={ResetPasswordSchema}
      validateOnBlur={false}
    >
      {({ errors, isSubmitting }) => (
        <Form className={classes.form} noValidate>
          <Field name="password">
            {({ field }: FieldProps) => (
              <TextField
                variant="outlined"
                margin="normal"
                size="small"
                required
                fullWidth
                label="Новый пароль"
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
                size="small"
                error={Boolean(errors.repassword)}
                helperText={errors.repassword}
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

export default ResetPasswordForm;
