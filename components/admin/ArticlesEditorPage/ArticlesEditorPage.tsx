import React, { useState, ReactNode } from "react";
import { Formik, Form, FieldProps, Field, FormikHelpers } from "formik";
import dynamic from "next/dynamic";
import { EditorState } from "draft-js";
import { convertToHTML } from "draft-convert";
import { EditorProps } from "react-draft-wysiwyg";
import { Paper, Box, TextField, Button, Grid } from "@material-ui/core";
import { gql } from "@apollo/client";
import Typography from "@material-ui/core/Typography";
import { Alert } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import { useCreateArticleMutation } from "../../../lib/types";
import { formatErrors } from "../../../utils/formatErrors";

const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

export const CREATE_ARTICLE = gql`
  mutation CreateArticle($createArticleDto: CreateArticleDto!) {
    createArticle(createArticleDto: $createArticleDto) {
      path
      message
    }
  }
`;

type FormValues = {
  title: string;
  alias: string;
};

const ArticlesEditorPage = () => {
  const history = useHistory();
  const [createArticle, { loading, error }] = useCreateArticleMutation();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const changeHandler = (nextState: EditorState) => {
    setEditorState(nextState);
  };

  const onSubmit = async (
    { alias, title }: FormValues,
    { setErrors, setSubmitting }: FormikHelpers<FormValues>
  ) => {
    const res = await createArticle({
      variables: {
        createArticleDto: {
          title,
          alias,
          text: convertToHTML({})(editorState.getCurrentContent()),
        },
      },
    });

    const errors = res?.data?.createArticle;
    if (errors) {
      setErrors(formatErrors(errors));
    } else {
      history.push("/articles");
    }
    setSubmitting(false);
  };

  return (
    <div>
      <Formik
        initialValues={{
          title: "",
          alias: "",
        }}
        onSubmit={onSubmit}
      >
        {({ errors }) => (
          <Form>
            <Box mt={1} mb={2} px={2}>
              <Typography variant="h3">Добавить статью</Typography>
            </Box>
            {error && (
              <Box mb={2}>
                <Alert severity="error">Произошла ошибка</Alert>
              </Box>
            )}
            <Box mb={1}>
              <Paper>
                <Box p={2}>
                  <Box mb={2}>
                    <Field name="title">
                      {({ field }: FieldProps) => {
                        return (
                          <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="Заголовок"
                            autoFocus
                            error={Boolean(errors.title)}
                            helperText={errors.title}
                            {...field}
                          />
                        );
                      }}
                    </Field>
                  </Box>
                  <Box>
                    <Field name="alias">
                      {({ field }: FieldProps) => {
                        return (
                          <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="Алиас"
                            autoFocus
                            error={Boolean(errors.alias)}
                            helperText={errors.alias}
                            {...field}
                          />
                        );
                      }}
                    </Field>
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
                    disabled={loading}
                    type="submit"
                  >
                    Сохранить
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ArticlesEditorPage;
