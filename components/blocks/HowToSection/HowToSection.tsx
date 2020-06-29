import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import CustomContainer from "../CustomContainer";
import StepBlock from "../StepBlock";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "60px",
    paddingBottom: "55px",
    backgroundColor: "#E9F0FF",
    [theme.breakpoints.up("lg")]: {
      paddingTop: "80px",
    },
  },
  title: {
    marginBottom: "60px",
    fontFamily: "'Comfortaa', cursive",
    fontSize: "36px",
    fontWeight: 500,
    [theme.breakpoints.up("lg")]: {
      fontSize: "48px",
      marginBottom: "75px",
    },
  },
  actionButton: {
    marginTop: "50px",
    fontSize: "25px",
    textTransform: "none",
    paddingLeft: "30px",
    paddingRight: "30px",
  },
}));

type Props = {
  onActionClick: () => void;
};

const HowToSection = ({ onActionClick }: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CustomContainer>
        <Typography variant="h4" align="center" className={classes.title}>
          Как это работает
        </Typography>
        <Grid container justify="center">
          <Grid item zeroMinWidth>
            <Box mb={4}>
              <StepBlock
                num={1}
                title="Выбрать"
                text="В личном кабинете выберите сервис от которого придет смс"
                image="/static/first-step.jpg"
              />
              <StepBlock
                num={2}
                title="Оплатить"
                text="Нажмите “Купить номер” и оплатите"
                image="/static/second-step.jpg"
              />
              <StepBlock
                num={3}
                title="Отправить"
                text="Отправьте на выданный виртуальный номер СМС"
                image="/static/third-step.jpg"
              />
              <StepBlock
                num={4}
                title="Использовать"
                text="Используйте полученный в СМС код в нужном сервисе"
                image="/static/fourth-step.jpg"
              />
            </Box>
            {/* <Box display="flex" justifyContent="center">
              <Button
                color="secondary"
                variant="contained"
                className={classes.actionButton}
                onClick={onActionClick}
              >
                Заказать номер
              </Button>
            </Box> */}
          </Grid>
        </Grid>
      </CustomContainer>
    </div>
  );
};

export default HowToSection;
