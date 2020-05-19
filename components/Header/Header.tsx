import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CustomContainer from "../CustomContainer";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "rgba(30, 113, 255, 0.5)",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.root} position="fixed">
      <CustomContainer>
        <Toolbar disableGutters>
          {/* <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            SIMCARD
            <Typography variant="h6" component="span">
              Online
            </Typography>
          </Typography>
          <Button color="inherit">Главная</Button>
          <Button color="inherit">Контакты</Button>
          <Button color="inherit">Цены</Button>
          <Button color="inherit">Вход</Button>
          <Button color="inherit">Регистрация</Button>
        </Toolbar>
      </CustomContainer>
    </AppBar>
  );
};

export default Header;
