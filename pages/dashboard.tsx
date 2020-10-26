import { Button, Chip } from "@material-ui/core";
import React from "react";
import Header from "../components/Header";
import DashboardPage from "../components/Dashboard/DashboardPage";
import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  const { displayName, me, logout } = useAuth();

  return (
    <>
      <Header
        secondaryAction={
          <span>
            <Chip color="primary" label={<>{me?.balanceAmount} ₽</>} />
            <span style={{ marginLeft: "20px" }}>{displayName}</span>
            <Button size="small" onClick={logout}>
              Выйти
            </Button>
          </span>
        }
      />
      <DashboardPage />
    </>
  );
};

export default Dashboard;
