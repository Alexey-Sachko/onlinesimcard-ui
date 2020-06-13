import React from "react";
import { NextPage } from "next";

const AdminPage: NextPage = () => {
  return <div>AdminPage</div>;
};

AdminPage.getInitialProps = async ({ res, req }) => {
  // const cookies = req ? req.headers.cookie : undefined
};

export default AdminPage;
