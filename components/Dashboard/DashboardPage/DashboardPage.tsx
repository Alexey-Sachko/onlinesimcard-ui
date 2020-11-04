import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { gql } from "@apollo/client";
import { useSnackbar } from "notistack";

import { useMakePaymentMutation } from "../../../lib/types";
import { useAuth } from "../../../hooks/useAuth";
import Header from "../../Header";
import Activations from "../Activations";
import Balance from "./Balance";
import PayModal, { OnPayProps } from "../PayModal";
import Footer from "../../blocks/Footer";

export const MAKE_PAYMENT_MUTATION = gql`
  mutation MakePayment($makePaymentInput: MakePaymentInput!) {
    makePayment(makePaymenInput: $makePaymentInput) {
      orderId
      url
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
      variables: { makePaymentInput: { amount } },
    });
    if (res.data) {
      const { url } = res.data.makePayment;
      location.href = url;
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
          <span>
            <Balance
              amount={me?.balanceAmount}
              onPay={() => setPayModalOpen(true)}
            />
            <span style={{ marginLeft: "20px" }}>{displayName}</span>
            <Button size="small" onClick={logout}>
              Выйти
            </Button>
          </span>
        }
      />
      <ActiveScreen />
      <PayModal
        open={payModalOpen}
        onClose={() => setPayModalOpen(false)}
        onPay={payHandler}
      />
      <Footer />
    </>
  );
};

export default DashboardPage;
