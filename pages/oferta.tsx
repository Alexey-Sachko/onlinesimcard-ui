import {
  Box,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
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
      <Header fullWidth="1380px" secondaryAction={<DefaultAction />} />
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
              предложением (публичной офертой) ВиртуалНам (Далее –
              «Исполнитель») для любого физического или юридического лица (далее
              – «Заказчик»), которое примет настоящее предложение на указанных
              ниже условиях.
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
              <Box display="flex" justifyContent="flex-end" mb={2}>
                <Box width="300px">
                  Приложение № 1 к публичной оферте на оказание посреднических и
                  технических услуг от ВиртуалНам
                </Box>
              </Box>

              <table className="example-table">
                <thead>
                  <tr>
                    <td>Виды услуг</td>
                    <td>Стоимость</td>
                    <td>Срок оказания</td>
                    <td>Иные условия</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Онлайн прием СМС</td>
                    <td>Стоимость оказания услуги размещена на Сайте.</td>
                    <td>
                      Услуга доступна в течение 20 минут с момента запроса на
                      оказание услуги.
                    </td>
                    <td>Повторное оказание услуги невозможно</td>
                  </tr>
                  <tr>
                    <td>Онлайн прием СМС + повтор</td>
                    <td>Стоимость оказания услуги размещена на Сайте.</td>
                    <td>
                      Услуга доступна в течение 20 минут с момента запроса на
                      оказание услуги.
                    </td>
                    <td>
                      Исполнитель допускает, но не гарантирует повторное
                      оказание услуги Приема СМС на используемый номер в течение
                      1 месяцев с момента оказания Услуги.
                    </td>
                  </tr>
                </tbody>
              </table>

              <Box mt={2}>
                <List dense>
                  <ListItem>
                    <ListItemText>
                      <strong>1.</strong> Настоящее приложение является
                      неотъемлемой частью Публичной оферты на оказание
                      посреднических и технических услуг ВиртуалНам (Далее –
                      Договор).
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemText>
                      <strong>2.</strong> В настоящем Приложении используются
                      Термины, предусмотренные разделом «1» Договора.
                    </ListItemText>
                  </ListItem>
                </List>
              </Box>
            </Box>
            <Divider />

            <Box mt={5}>
              <Box display="flex" justifyContent="flex-end" mb={2}>
                <Box width="300px">
                  Приложение № 2 к публичной оферте на оказание посреднических и
                  технических услуг от ВиртуалНам
                </Box>
              </Box>

              <Box>
                <List dense>
                  <ListItem>
                    <ListItemText>
                      <strong>1.</strong> Настоящее приложение является
                      неотъемлемой частью Публичной оферты на оказание
                      посреднических и технических услуг ВиртуалНам (Далее –
                      Договор).
                    </ListItemText>
                  </ListItem>

                  <ListItem>
                    <ListItemText>
                      <strong>2.</strong> В настоящем Приложении используются
                      Термины, предусмотренные разделом «1» Договора.
                    </ListItemText>
                  </ListItem>

                  <ListItem>
                    <ListItemText>
                      <strong>3.</strong> Перечень, предусмотренный пунктом 4
                      настоящего Приложения, может быть изменен и дополнен
                      Исполнителем в соответствии с условиями п. 5.3.1.
                      Договора.
                    </ListItemText>
                  </ListItem>

                  <ListItem>
                    <ListItemText>
                      <strong>4.</strong> Список имен отправителей, в отношении
                      которых услуга Приема СМС не предоставляется:DDOnline,
                      MKKDDOnline, PMSM, Tinkoff, PayQR, Denga, Wooppay.com,
                      MOBI.Dengi, Modulbank, Ezaem, denvzaimy, 111, QIWIWallet,
                      YandexMoney, Wallet One, PrivatBank, WebMoney, qppi.ru,
                      PlatiPotom, WM Mini, MoneXy, Eurozaem, MEGAFON,
                      PLATIZA.RU, ekapusta, MoneyClick, Alfa-Bank, INTERKASSA,
                      Beeline, WM Check, MegaFonPRO, Zaymer.ru, QIWI Wallet,
                      QIWI_WALLET, AdminVPS, WalletOne, qppiru, WMMini,
                      PLATIZARU, AlfaBank, MobiDengi, WMCheck, Zaymerru, uBank,
                      QIWI, MegaFon, GreenMoney, LIME-ZAIM, MegaFon_web,
                      MegaFonTV, MigCredit, Moneyman.ru, PLATIZA, QIWI_Wallet,
                      QPPI.RU,SMSfinance, unicom24ru, Vivus.ru, 0500, ActiveBC,
                      LOVIZAIM, MangoMoney, moneyman, POCHTABANK, SPASIBO, MTC
                    </ListItemText>
                  </ListItem>
                </List>
              </Box>
            </Box>
          </>
        )}
      </Box>

      <style jsx>
        {`
          .example-table {
            border-collapse: collapse;
            border: none;
            margin: 0;
            padding: 0;
            border-spacing: 0;
            background-image: none;
            font-size: 14px;
            width: 100%;
          }

          .example-table td {
            border: 1px solid black;
            border-collapse: collapse;
            margin: 0;
            padding: 15px 10px;
            border-spacing: 0;
            background-image: none;
          }

          .example-table table td {
            border: none;
            border-bottom: 1px solid black;
          }

          .example-table table tr:last-child td {
            border: none;
          }
        `}
      </style>
    </>
  );
};

export default Rules;
