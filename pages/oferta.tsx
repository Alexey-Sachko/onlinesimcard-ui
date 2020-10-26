import {
  Box,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React from "react";

import Header from "../components/Header";
import { DefaultAction } from "../components/Header/actions";
import { oferta } from "../data/oferta";

const Rules = () => {
  const [rules, setRules] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const rulesData = oferta
      .replace(/\n(\d+\.)/g, "__divider__$1")
      .split("__divider__")
      .slice(1)
      .map((point) => {
        const draft = point
          .replace(/^(\s*)[\d\.]+/, "$&__divider__")
          .split("__divider__");
        return {
          index: draft[0],
          text: draft[1],
        };
      });

    setTimeout(() => {
      setRules(rulesData);
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      <Header secondaryAction={<DefaultAction />} />
      <Box py={2} px={3}>
        <Typography variant="h4">Пользовательское соглашение</Typography>
        {loading ? (
          <Box display="flex" justifyContent="center" mt={5}>
            <CircularProgress size={50} />
          </Box>
        ) : (
          <>
            <Box mt={2}>
              Публичная оферта на оказание посреднических и технических Услуг
              Настоящая публичная оферта на оказание посреднических и
              технических услуг (далее – «Договор») является официальным
              предложением (публичной офертой) ОнлайнСим (Далее – «Исполнитель»)
              для любого физического или юридического лица (далее – «Заказчик»),
              которое примет настоящее предложение на указанных ниже условиях.
            </Box>
            <List dense>
              {rules.map(({ index, text }, idx) => (
                <ListItem key={index}>
                  <ListItemText>
                    <strong>{index}</strong> {text}
                  </ListItemText>
                </ListItem>
              ))}
            </List>
            <Divider />

            <Box mt={5}>
              <Box display="flex" justifyContent="flex-end">
                <Box width="300px">
                  Приложение № 1 к публичной оферте на оказание посреднических и
                  технических услуг от ОнлайнСим
                </Box>
              </Box>

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={2}>
                      Виды услуги / Тарифы и условия оказания Услуги
                    </TableCell>
                    <TableCell>Онлайн прием СМС</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell rowSpan={3}>Повтор СМС</TableCell>
                    <TableCell>3</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell rowSpan={3}></TableCell>
                    <TableCell>4</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell rowSpan={3}></TableCell>
                    <TableCell>5</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default Rules;
