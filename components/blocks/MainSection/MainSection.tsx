import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import CustomContainer from "../CustomContainer";
import ProductCard from "../ProductCard";
import { RightCapture, OrangeText } from "./main-section.styled";

type Props = {
  onActionClick: () => void;
};

const MainSection = ({ onActionClick }: Props) => {
  return (
    <CustomContainer>
      <Grid container>
        <Grid item xs={5}>
          <Box m="auto">
            <Typography variant="h2">
              Виртуальный номер
              <br /> для приема СМС
            </Typography>
            <Box mt={6}>
              <Typography variant="subtitle1">
                Onlinesimcard.ru - сервис по приему SMS-сообщений на виртуальные
                номера.
                <Box mt={3}>
                  Мы имеем временные <OrangeText>бесплатные</OrangeText>, а
                  также приватные номера разных стран мира для получения кодов
                  активаций и смс подтверждений онлайн.
                </Box>
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={7}>
          <RightCapture ml="auto" />
        </Grid>
      </Grid>

      {/* <Grid container spacing={2}> */}
      {/* <Grid item zeroMinWidth xs={12} sm={6} md={5} lg="auto">
              <ProductCard
                title="Одноразовые номера"
                price="от 1₽ / номер"
                features={[
                  "один номер для одного сервиса",
                  "номер активен 20 минут",
                  "более 20 стран в наличии",
                ]}
                onActionClick={onActionClick}
              />
            </Grid>
            <Grid item zeroMinWidth xs={12} sm={6} md={5} lg="auto">
              <ProductCard
                title="Номера для аренды"
                price="от 30₽ / день"
                features={[
                  "номер всегда онлайн",
                  "безлимитный прием смс",
                  "срок аренды до 180 дней и продление",
                ]}
                onActionClick={onActionClick}
              />
            </Grid> */}
      {/* </Grid> */}
    </CustomContainer>
  );
};

export default MainSection;
