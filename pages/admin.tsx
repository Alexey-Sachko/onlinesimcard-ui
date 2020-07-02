import React from "react";
import { NextPage } from "next";
import RootAdmin from "../components/admin/RootAdmin";

const AdminPage: NextPage = () => {
  return <RootAdmin />;
};

// export default privatePage(AdminPage, { permissions: [Permissions.ReadUsers] });
export default AdminPage;
