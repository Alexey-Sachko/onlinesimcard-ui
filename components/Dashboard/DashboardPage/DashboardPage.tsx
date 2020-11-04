import React, { useState } from "react";
import { Button } from "@material-ui/core";

import { useAuth } from "../../../hooks/useAuth";
import Header from "../../Header";
import Activations from "../Activations";
import Balance from "./Balance";
import Payment from "../Payment";

const screens = {
  Activations,
  Payment,
};

export type ScreenKey = keyof typeof screens;

const DashboardPage = () => {
  const { displayName, me, logout } = useAuth();
  const [activeScreen, setActiveScreen] = useState<ScreenKey>("Activations");
  const ActiveScreen = screens[activeScreen];

  return (
    <>
      <Header
        secondaryAction={
          <span>
            <Balance
              amount={me?.balanceAmount}
              onPay={() => setActiveScreen("Payment")}
            />
            <span style={{ marginLeft: "20px" }}>{displayName}</span>
            <Button size="small" onClick={logout}>
              Выйти
            </Button>
          </span>
        }
      />
      <ActiveScreen />
    </>
  );
};

export default DashboardPage;
