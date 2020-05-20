import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import CustomContainer from "../CustomContainer";
import ProductCard from "../ProductCard";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    background: "url(/static/bg-first-section.jpg) center no-repeat",
    backgroundSize: "cover",
  },
  overlay: {
    paddingTop: "calc(20px + 64px)",
    paddingBottom: "30px",
    width: "100%",
    height: "100%",
    minHeight: "100vh",
    background:
      "radial-gradient(33.2% 130.09% at 72.5% 35.88%, rgba(196, 196, 196, 0) 0%, rgba(0, 0, 0, 0.5) 89.74%, rgba(0, 0, 0, 0.7) 100%)",
    // [theme.breakpoints.up("xs")]: {
    //   paddingTop: "calc(10px + 64px)",
    // },
    [theme.breakpoints.up("sm")]: {
      paddingTop: "calc(50px + 64px)",
    },
    [theme.breakpoints.up("lg")]: {
      paddingTop: "calc(70px + 64px)",
    },
  },
  title: {
    fontSize: "36px",
    fontWeight: 500,
    marginBottom: "25px",
    [theme.breakpoints.up("lg")]: {
      fontSize: "48px",
      marginBottom: "40px",
    },
  },
  textBlock: {
    color: "#fff",
    maxWidth: "665px",
    marginBottom: "40px",
  },
  description: {
    fontSize: "16px",
    [theme.breakpoints.up("lg")]: {
      fontSize: "20px",
    },
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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={5} lg={4}>
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
            <Grid item xs={12} sm={6} md={5} lg={4}>
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
        </CustomContainer>
      </div>
    </Box>
  );
};

export default MainSection;
