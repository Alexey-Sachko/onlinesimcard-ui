import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import CustomContainer from "../CustomContainer";
import ProductCard from "../ProductCard";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    background: "url(/static/bg-first-section.jpg) center no-repeat",
    backgroundSize: "cover",
  },
  overlay: {
    paddingTop: "calc(80px + 64px)",
    width: "100%",
    height: "100%",
    background:
      "radial-gradient(33.2% 130.09% at 72.5% 35.88%, rgba(196, 196, 196, 0) 0%, rgba(0, 0, 0, 0.5) 89.74%, rgba(0, 0, 0, 0.7) 100%)",
  },
  title: {
    fontSize: "48px",
    fontWeight: 500,
    marginBottom: "40px",
  },
  textBlock: {
    color: "#fff",
    maxWidth: "665px",
    marginBottom: "40px",
  },
  description: {
    fontSize: "24px",
  },
  products: {
    display: "flex",
  },
}));

const MainSection = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <div className={classes.overlay}>
        <CustomContainer>
          <div className={classes.textBlock}>
            <Typography variant="h1" className={classes.title}>
              Виртуальный номер
              <br /> для приема СМС
            </Typography>
            <Typography className={classes.description}>
              Onlinesimcard.ru - сервис по приему SMS-сообщений на виртуальные
              номера. Мы имеем временные бесплатные, а также приватные номера
              разных стран мира для получения кодов активаций и смс
              подтверждений онлайн.
            </Typography>
          </div>
          {/* <div className={classes.products}> */}
          <Grid container spacing={2}>
            <Grid item md={6} lg={5} xl={5}>
              <ProductCard
                title="Одноразовые номера"
                price="от 1₽ / номер"
                features={[
                  "один номер для одного сервиса",
                  "номер активен 20 минут",
                  "более 20 стран в наличии",
                ]}
              />
            </Grid>
            <Grid item md={6} lg={5} xl={5}>
              <ProductCard
                title="Номера для аренды"
                price="от 30₽ / день"
                features={[
                  "номер всегда онлайн",
                  "безлимитный прием смс",
                  "срок аренды до 180 дней и продление",
                ]}
              />
            </Grid>
          </Grid>
          {/* </div> */}
        </CustomContainer>
      </div>
    </Box>
  );
};

export default MainSection;
