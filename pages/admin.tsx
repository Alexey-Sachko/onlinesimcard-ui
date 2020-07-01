import React, { ReactNode, useState } from "react";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { gql, useQuery } from "@apollo/client";
import { CircularProgress } from "@material-ui/core";
import { EditorState } from "draft-js";
import { EditorProps, RawDraftContentState } from "react-draft-wysiwyg";
import { useErrors } from "../lib/errors";

const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

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
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const changeHandler = (nextState: EditorState) => {
    setEditorState(nextState);
    console.log(nextState.toJS());
  };

  return (
    <div style={{ width: "90%", margin: "0 auto" }}>
      <Editor editorState={editorState} onEditorStateChange={changeHandler} />
    </div>
  );
};

// export default privatePage(AdminPage, { permissions: [Permissions.ReadUsers] });
export default AdminPage;
