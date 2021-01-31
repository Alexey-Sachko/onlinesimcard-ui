import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { gql } from "@apollo/client";
import { useSnackbar } from "notistack";
import { HashRouter, Route, Switch } from "react-router-dom";

import { useMakePaymentMutation } from "../../../lib/types";
import { useAuth } from "../../../hooks/useAuth";
import Header from "../../Header";
import Balance from "./Balance";
import PayModal, { OnPayProps } from "../PayModal";
import UserMenu from "./UserMenu";
import HistoryScreen from "../HistoryScreen/HistoryScreen";
import Activations from "../Activations";

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

const DashboardPage = () => {
  const [makePayment] = useMakePaymentMutation();
  const { displayName, me, logout } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const [payModalOpen, setPayModalOpen] = useState(false);

  const payHandler = async ({ amount, variant }: OnPayProps) => {
    const res = await makePayment({
      variables: {
        makePaymentInput: { amount, variant },
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
    <HashRouter>
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
      <Switch>
        <Route path="/" exact>
          <Activations />
        </Route>
        <Route path="/history" exact>
          <HistoryScreen />
        </Route>
      </Switch>
      <PayModal
        open={payModalOpen}
        onClose={() => setPayModalOpen(false)}
        onPay={payHandler}
      />
    </HashRouter>
  );
};

export default DashboardPage;
