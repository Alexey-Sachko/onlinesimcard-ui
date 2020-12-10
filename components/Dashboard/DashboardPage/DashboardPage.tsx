import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { gql } from "@apollo/client";
import { useSnackbar } from "notistack";

import { PaymentVariant, useMakePaymentMutation } from "../../../lib/types";
import { useAuth } from "../../../hooks/useAuth";
import Header from "../../Header";
import Activations from "../Activations";
import Balance from "./Balance";
import PayModal, { OnPayProps } from "../PayModal";
import UserMenu from "./UserMenu";

export const MAKE_PAYMENT_MUTATION = gql`
  mutation MakePayment($makePaymentInput: MakePaymentInput!) {
    makePayment(makePaymenInput: $makePaymentInput) {
      orderId
      formUrl
      method
      fields {
        name
        value
      }
    }
  }
`;

const screens = {
  Activations,
};

export type ScreenKey = keyof typeof screens;

const DashboardPage = () => {
  const [makePayment] = useMakePaymentMutation();
  const { displayName, me, logout } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [activeScreen, setActiveScreen] = useState<ScreenKey>("Activations");
  const ActiveScreen = screens[activeScreen];

  const [payModalOpen, setPayModalOpen] = useState(false);

  const payHandler = async ({ amount }: OnPayProps) => {
    const res = await makePayment({
      variables: {
        makePaymentInput: { amount, variant: PaymentVariant.Interkassa },
      },
    });
    if (res.data) {
      const { fields, formUrl, method, orderId } = res.data.makePayment;
      const form = document.createElement("form");
      form.setAttribute("method", method);
      form.setAttribute("action", formUrl);

      fields.forEach((field) => {
        const hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", field.name);
        hiddenField.setAttribute("value", field.value);
        form.appendChild(hiddenField);
      });

      document.body.appendChild(form);
      form.submit();
    }

    if (res.errors) {
      console.error(res.errors);
      enqueueSnackbar("Произошла ошибка", { variant: "error" });
    }
  };

  return (
    <>
      <Header
        secondaryAction={
          <Box display="flex">
            <Box mr={2}>
              <Balance
                amount={me?.balanceAmount}
                onPay={() => setPayModalOpen(true)}
              />
            </Box>
            <UserMenu displayName={displayName} onExit={logout} />
          </Box>
        }
      />
      <ActiveScreen />
      <PayModal
        open={payModalOpen}
        onClose={() => setPayModalOpen(false)}
        onPay={payHandler}
      />
    </>
  );
};

export default DashboardPage;
