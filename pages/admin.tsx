import React, { ReactNode } from "react";
import { NextPage } from "next";
import { gql, useQuery } from "@apollo/client";
import { CircularProgress } from "@material-ui/core";
import { useErrors } from "../lib/errors";

// import { privatePage, AuthProps } from "../hocs/privatePage";
// import { Permissions } from "../services/auth/permissions.enum";

const GET_ARTICLES_QUERY = gql`
  query GetArticles {
    articles {
      id
    }
  }
`;

const AdminPage: NextPage = () => {
  // Нужно знать что хук был вызван на сервере 1 раз и положить ошибку в контекст ошибок
  const { data, loading, error } = useQuery(GET_ARTICLES_QUERY);
  const err = useErrors("Articles", error);

  let contentJSX: ReactNode = null;

  if (err) {
    contentJSX = err.message;
  } else if (loading && !data) {
    contentJSX = <CircularProgress />;
  } else {
    contentJSX = <pre>{JSON.stringify(data, null, 2)}</pre>;
  }

  console.log("Error", err);
  console.log("Data", data);
  console.log("Loading", loading);

  return (
    <>
      {/* <Header blueBg /> */}
      <h3>AdminPage</h3>
      <div>{contentJSX}</div>
    </>
  );
};

// export default privatePage(AdminPage, { permissions: [Permissions.ReadUsers] });
export default AdminPage;
