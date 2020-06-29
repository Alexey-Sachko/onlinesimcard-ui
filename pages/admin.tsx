import React from "react";
import { NextPage } from "next";

import { privatePage, AuthProps } from "../hocs/privatePage";
import { Permissions } from "../services/auth/permissions.enum";

type Props = AuthProps;

const AdminPage: NextPage<Props> = ({ auth }) => {
  return (
    <div>
      AdminPage
      <p>
        <strong>user</strong>: {auth.decodedToken.email}
      </p>
      <p>
        <strong>isValid</strong>: {auth.isValid.toString()}
      </p>
      <p>
        <strong>isExpired</strong>: {auth.isExpired.toString()}
      </p>
      <p>
        <strong>authorizationString</strong>: {auth.authorizationString}
      </p>
      <p>
        <strong>expiresAt</strong>: {auth.expiresAt.toString()}
      </p>
    </div>
  );
};

// export default privatePage(AdminPage, { permissions: [Permissions.ReadUsers] });
export default AdminPage;
