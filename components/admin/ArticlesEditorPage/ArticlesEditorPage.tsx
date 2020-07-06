import React, { useState, ReactNode } from "react";
import dynamic from "next/dynamic";
import { EditorState } from "draft-js";
import { convertToHTML } from "draft-convert";
import { EditorProps } from "react-draft-wysiwyg";
import { Paper, Box, TextField, Button, Grid } from "@material-ui/core";
import { gql } from "@apollo/client";
import Typography from "@material-ui/core/Typography";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import { useCreateArticleMutation } from "../../../lib/types";

const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

export const CREATE_ARTICLE = gql`
  mutation CreateArticle($createArticleDto: CreateArticleDto!) {
    createArticle(createArticleDto: $createArticleDto) {
      path
      message
      constraints {
        type
        message
      }
    }
  }
`;

const ArticlesEditorPage = () => {
  const history = useHistory();
  const [createArticle, { data, loading, error }] = useCreateArticleMutation({
    // В случае успеха вернет null, иначе массив ошибок
    onCompleted: (_data) => {
      if (!data.createArticle) {
        history.push("/admin/articles");
      }
    },
  });

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState("");
  const [alias, setAlias] = useState("");

  const changeHandler = (nextState: EditorState) => {
    setEditorState(nextState);
  };
  const onChangeTitle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTitle(e.target.value);
  };
  const onChangeAlias = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAlias(e.target.value);
  };

  const onSubmit = () => {
    createArticle({
      variables: {
        createArticleDto: {
          title,
          alias,
          text: convertToHTML({})(editorState.getCurrentContent()),
        },
      },
    });
  };

  const errors = data.createArticle;
  let clientErrorsJSX: ReactNode = null;
  let serverErrorsJSX: ReactNode = null;
  if (error) {
    serverErrorsJSX = <Typography>{error.message}</Typography>;
  }
  if (errors?.length > 0) {
    clientErrorsJSX = errors.map((err, idx) => (
      <div key={idx}>
        {err.message}
        {err.constraints?.map((con, conIdx) => (
          <div key={conIdx}>{con.message}</div>
        ))}
      </div>
    ));
  }

  return (
    <div>
      <Box mt={1} mb={2} px={2}>
        <Typography variant="h3">Добавить статью</Typography>

        {clientErrorsJSX ||
          (serverErrorsJSX && (
            <Box mt={1}>
              <Alert severity="error">
                <AlertTitle>Произошла ошибка:</AlertTitle>
                {serverErrorsJSX}
                {clientErrorsJSX}
              </Alert>
            </Box>
          ))}
      </Box>
      <Box mb={1}>
        <Paper>
          <Box p={2}>
            <Box mb={2}>
              <TextField
                variant="outlined"
                label="Заголовок"
                fullWidth
                value={title}
                onChange={onChangeTitle}
              />
            </Box>
            <Box>
              <TextField
                variant="outlined"
                label="Алиас"
                fullWidth
                value={alias}
                onChange={onChangeAlias}
              />
            </Box>
          </Box>
        </Paper>
      </Box>
      <Paper>
        <Box px={2} py={2}>
          <Editor
            editorState={editorState}
            onEditorStateChange={changeHandler}
          />
        </Box>
      </Paper>

      <Box mt={1}>
        <Grid container justify="flex-end" spacing={2}>
          <Grid item>
            <Button variant="outlined" color="secondary">
              Отмена (TODO)
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={onSubmit}
              disabled={loading}
            >
              Сохранить
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default ArticlesEditorPage;
