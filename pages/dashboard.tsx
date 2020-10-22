import React from "react";
import Header from "../components/blocks/Header";
import DashboardPage from "../components/Dashboard/DashboardPage";
import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  const { displayName } = useAuth();

  return (
    <>
      <Header secondaryAction={displayName} />
      <DashboardPage />
    </>
  );
};

export default Dashboard;
