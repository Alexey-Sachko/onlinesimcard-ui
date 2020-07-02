import React from "react";
import { HashRouter, Switch, Route, Link } from "react-router-dom";
import {
  Grid,
  Typography,
  Divider,
  Box,
  List,
  ListItem,
} from "@material-ui/core";
import ArticlesAdminPage from "../ArticlesAdminPage";
import ArticlesEditorPage from "../ArticlesEditorPage";
import { LeftSide, RightSide } from "./styled";

const isBrowser = typeof window !== "undefined";

// Компоненту админки не нужен ssr поэтому было принято решение сделать обычный hash router
const RootAdmin = () => {
  if (!isBrowser) {
    return <>Loading javascript</>;
  }

  return (
    <HashRouter>
      <Grid container wrap="nowrap">
        <LeftSide item>
          <List>
            <ListItem divider>
              <Link to="/">
                <Typography>Главная</Typography>
              </Link>
            </ListItem>
            <ListItem divider>
              <Link to="/articles">
                <Typography>Статьи</Typography>
              </Link>
            </ListItem>
          </List>
        </LeftSide>
        <RightSide item>
          <Box p={2}>
            <Switch>
              <Route path="/articles" exact>
                <ArticlesAdminPage />
              </Route>
              <Route path="/articles/create" exact>
                <ArticlesEditorPage />
              </Route>
              <Route path="/articles/:id" exact>
                <ArticlesEditorPage />
              </Route>
            </Switch>
          </Box>
        </RightSide>
      </Grid>
    </HashRouter>
  );
};

export default RootAdmin;
