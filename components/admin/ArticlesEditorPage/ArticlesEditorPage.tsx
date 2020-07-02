import React, { useState } from "react";
import dynamic from "next/dynamic";
import { EditorState } from "draft-js";
import { EditorProps } from "react-draft-wysiwyg";
import { Paper, Box, TextField, Button, Grid } from "@material-ui/core";

const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const ArticlesEditorPage = () => {
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
    console.log("Mutation", {
      title,
      alias,
    });
  };

  return (
    <div>
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
              Отмена
            </Button>
          </Grid>

          <Grid item>
            <Button variant="contained" color="primary" onClick={onSubmit}>
              Сохранить
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default ArticlesEditorPage;
