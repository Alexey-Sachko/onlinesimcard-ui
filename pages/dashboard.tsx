import React from "react";
import { PageWithStore } from "../redux";
import { useTypedSelector } from "../redux/index";

const Dashboard: PageWithStore = () => {
  const { user } = useTypedSelector((state) => state);
  // return <div>email: {user.email}</div>;
  return null;
};

Dashboard.getInitialProps = async ({ store }) => {};

export default Dashboard;
