import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { gql } from "@apollo/client";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Grid,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Wrapper, AddButtonContainer } from "./styled";
import { useGetArticlesQuery } from "../../../lib/types";

export const GET_ARTICLES_QUERY = gql`
  query GetArticles {
    articles {
      id
      alias
      title
      text
    }
  }
`;

const ArticlesAdminPage = () => {
  // Нужно знать что хук был вызван на сервере 1 раз и положить ошибку в контекст ошибок
  const { data, loading, error } = useGetArticlesQuery({
    fetchPolicy: "cache-and-network",
  });

  return (
    <div>
      <AddButtonContainer container justify="flex-end">
        <Grid item>
          <Link to="/articles/create">
            <Button
              size="small"
              color="primary"
              variant="outlined"
              endIcon={<AddIcon />}
            >
              Добавить
            </Button>
          </Link>
        </Grid>
      </AddButtonContainer>
      <Wrapper>
        {loading && <h3>Загрузка...</h3>}
        {error && <div>Error: {error.message}</div>}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Alias</TableCell>
              <TableCell>Title</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.articles?.map(({ id, alias, title }) => (
              <TableRow key={id}>
                <TableCell>{id}</TableCell>
                <TableCell>{alias}</TableCell>
                <TableCell>{title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Wrapper>
    </div>
  );
};

export default ArticlesAdminPage;
