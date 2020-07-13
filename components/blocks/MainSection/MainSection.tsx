import React from "react";

import CustomContainer from "../CustomContainer";
import ProductCard from "../ProductCard";
import Typography from "../../layout/Typography";
import { theme } from "../../../theme/customTheme";

const MainSection = () => {
  return (
    <CustomContainer>
      <style jsx>
        {`
          .title-text {
            margin: auto;
          }
          .body-text {
            margin-top: 30px;
          }
          .body-text-bottom {
            margin-top: 15px;
          }
          .orange-text {
            color: ${theme.colors.mangoBasic};
          }
          .grid-container {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            box-sizing: border-box;
          }
          .grid-item-description {
            flex-grow: 0;
            max-width: 41.666667%;
            flex-basis: 41.666667%;
            margin: 0;
            box-sizing: border-box;
          }
          .grid-item-img {
            flex-grow: 0;
            max-width: 58.333333%;
            flex-basis: 58.333333%;
            margin: 0;
            box-sizing: border-box;
          }
        `}
      </style>
      <div className="grid-container">
        <div className="grid-item-description">
          <div className="title-text">
            <Typography variant="h2">
              Виртуальный номер
              <br /> для приема СМС
            </Typography>
            <div className="body-text">
              <Typography variant="bigParagraph" color="jetBasic">
                Onlinesimcard.ru - сервис по приему SMS-сообщений на виртуальные
                номера.
                <div className="body-text-bottom">
                  Мы имеем временные
                  <span className="orange-text"> бесплатные</span>, а также
                  приватные номера разных стран мира для получения кодов
                  активаций и смс подтверждений онлайн.
                </div>
              </Typography>
            </div>
          </div>
        </div>
        <div className="grid-item-img">
          <img src="/static/bg-main-section.jpg" alt="rightPickcher" />
        </div>
      </div>

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
