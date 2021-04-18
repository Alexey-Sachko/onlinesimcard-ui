import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { gql } from "@apollo/client";
import { useSnackbar } from "notistack";
import { HashRouter, Route, Switch } from "react-router-dom";

import { useMakePaymentMutation } from "../../../lib/types";
import { useAuth } from "../../../hooks/useAuth";
import Header from "../../Header";
import UserMenu from "./UserMenu";
import Menu from "../Menu";
import Backdrop from "../../layout/Backdrop";
import Activations from "../Activations";
import HistoryScreen from "../HistoryScreen/HistoryScreen";
import { OnPayProps, PayScreen } from "../PayScreen";
import { HeaderPayButton } from "./HeaderPayButton";

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

  const [isOpenMenu, setOpenMenu] = useState(false);

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
      form.setAttribute("target", "_blank");

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
          <Box display="flex" width="100%">
            <div className="header-balance">
              Баланс:{" "}
              <span className="header-balance_count">
                {me?.balanceAmount} руб.
              </span>
            </div>
            <HeaderPayButton />
            <div className="user-name">
              <UserMenu displayName={displayName} onExit={logout} />
            </div>
          </Box>
        }
        setOpenMenu={setOpenMenu}
        fullWidth="1320px"
        mobileHideLogo
        dark
      />
      <Backdrop open={isOpenMenu} onClick={() => setOpenMenu(false)} />
      <div className="dashboard-container">
        <div className="dashboard-inner">
          <div className="menu">
            <Menu setOpenMenu={setOpenMenu} />
          </div>

          <div style={{ width: "100%", height: "100%" }}>
            <Switch>
              <Route path="/" exact>
                <Activations />
              </Route>
              <Route path="/history" exact>
                <HistoryScreen />
              </Route>
              <Route path="/pay" exact>
                <PayScreen onPay={payHandler} />
              </Route>
            </Switch>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard-inner {
          display: flex;
          margin: 0 auto 0 auto;
          padding-top: 8px;
          width: 1320px;
          height: 100%;
        }

        .menu {
          margin-right: 20px;
          transition: all ease 0.3s;
        }

        .dashboard-container {
          width: 100%;
          max-height: calc(100vh - 55px);
          height: 100%;
          overflow: hidden;
          background: #f5f5f9;
        }

        .header-balance {
          margin: auto 20px auto 0;
          color: #fff;
          font-size: 13px;
          font-weight: 300;
          padding-left: 20px;
        }

        .header-balance_count {
          font-weight: bold;
          white-space: nowrap;
        }

        .user-name {
          margin-left: auto;
        }

        @media (max-width: 1410px) {
          .dashboard-container {
            padding: 0 20px;
          }
          .dashboard-inner {
            width: 100%;
          }
        }

        @media (max-width: 1140px) {
          .menu {
            margin-right: 10px;
          }
        }

        @media (max-width: 1100px) {
          .menu {
            position: fixed;
            margin-right: 0;
            z-index: 11;
            top: 50px;
            left: 0;
            height: calc(100vh - 50px);
          }
        }

        @media (max-width: 760px) {
          .user-name {
            display: none;
          }
          .header-balance {
            margin-left: auto;
          }
        }
        @media (max-width: 375px) {
          .dashboard-container {
            padding: 0 10px;
          }
          .dashboard-inner {
            padding-top: 10px;
          }

          .header-balance {
            padding-left: 0;
          }
        }
      `}</style>
      <style jsx>{`
        @media (max-width: 1100px) {
          .menu {
            left: ${isOpenMenu ? "0" : "-250px"};
          }
        }
      `}</style>
    </HashRouter>
  );
};

export default DashboardPage;
