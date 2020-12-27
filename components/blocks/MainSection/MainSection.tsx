import React from "react"
import { useRouter } from "next/router"
import { Box, CssBaseline, Grid } from "@material-ui/core"
import ym from "react-yandex-metrika"

import CustomContainer from "../CustomContainer"
import ProductCard from "../ProductCard"
import Typography from "../../layout/Typography"
import { useTheme } from "../../hooks/useTheme"

const MainSection = () => {
  const router = useRouter()
  const theme = useTheme()

  return (
    <CustomContainer style={{ margin: "0 10px" }}>
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
          .container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 2vw;
            margin-top: 50px;
          }
          .main-section-img {
            max-width: 600px;
            margin-left: auto;
          }
          .main-section-img img {
            width: 100%;
          }

          @media (max-width: 1024px) {
            .container {
              grid-template-columns: auto;
              grid-template-rows: auto 1fr;
            }
            .main-section-img {
              margin: auto;
            }
            .description {
              text-align: center;
              padding: 0 100px;
            }
            .body-text-bottom {
              text-align: center;
            }
          }

          @media (max-width: 768px) {
            .description {
              text-align: center;
              padding: 0 10px;
            }
            .container {
              margin-top: 30px;
            }
          }
        `}
      </style>
      <CssBaseline />
      <div className="container">
        <div className="description">
          <div className="title-text">
            <Typography variant="h2">
              Виртуальный номер
              <br /> для приема СМС
            </Typography>
            <div className="body-text">
              <Typography variant="bigParagraph" color="jetBasic">
                Virtualnum.ru - сервис по приему SMS-сообщений на виртуальные
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
        <div className="main-section-img">
          <img src="/static/bg-main-section.jpg" alt="rightPickcher" />
        </div>
      </div>
      <Box mt={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} lg={5} xl={4}>
            <ProductCard
              title="Одноразовые номера"
              price="от 1 руб./номер"
              features={[
                "один номер для одного сервиса",
                "номер активен 20 минут",
                "более 20 стран в наличии",
              ]}
              onActionClick={() => {
                router.push("/signup")
                ym("reachGoal", "GET_ONE_TIME_NUMBER")
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={5}>
            <ProductCard
              title="Номера для аренды"
              price="от 30 руб./день"
              features={[
                "номер всегда онлайн",
                "безлимитный прием смс",
                "срок аренды до 180 дней и продление",
              ]}
              onActionClick={() => {
                router.push("/signup")
                ym("reachGoal", "GET_RENT_NUMBER")
              }}
            />
          </Grid>
        </Grid>
      </Box>
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
  )
}

export default MainSection
