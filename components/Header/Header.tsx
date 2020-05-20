import React, { useEffect, useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CustomContainer from "../CustomContainer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Hidden from "@material-ui/core/Hidden";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { List, ListItem, ListItemText } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "rgba(30, 113, 255, 0.5)",
    transition: "background-color 0.3s ease",
  },
  rootBlueBg: {
    backgroundColor: "rgba(30, 113, 255)",
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
  },
  logoImg: {
    maxHeight: "25px",
    // [theme.breakpoints.up("xs")]: {
    //   maxHeight: "40px",
    // },
    // [theme.breakpoints.up("md")]: {
    //   maxHeight: "40px",
    // },
    [theme.breakpoints.up("lg")]: {
      maxHeight: "35px",
    },
    // [theme.breakpoints.up("xl")]: {
    //   maxHeight: "40px",
    // },
  },
  drawerList: {
    minWidth: "250px",
  },
}));

const Header = () => {
  const classes = useStyles();
  const [isBlueHead, setIsBlueHead] = useState(false);
  const [drawerAnchor, setDrawerAnchor] = useState(false);

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setDrawerAnchor(open);
  };

  useEffect(() => {
    const scrollHandler = () => {
      const scrollTop = document.documentElement.scrollTop;
      if (scrollTop > 0) {
        if (!isBlueHead) {
          setIsBlueHead(true);
        }
      } else {
        if (isBlueHead) {
          setIsBlueHead(false);
        }
      }
    };
    document.addEventListener("scroll", scrollHandler);
    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, [isBlueHead]);

  const rootClasses = [classes.root];
  if (isBlueHead) {
    rootClasses.push(classes.rootBlueBg);
  }

  return (
    <AppBar className={rootClasses.join(" ")} position="fixed">
      <CustomContainer>
        <Toolbar disableGutters>
          <Hidden smUp implementation="css">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <SwipeableDrawer
              anchor="left"
              open={drawerAnchor}
              onClose={toggleDrawer(false)}
              onOpen={toggleDrawer(true)}
            >
              <div className={classes.drawerList}>
                <List>
                  <ListItem button>
                    <ListItemText primary="Цены" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Вход" />
                  </ListItem>
                </List>
              </div>
            </SwipeableDrawer>
          </Hidden>
          <div className={classes.title}>
            <img
              className={classes.logoImg}
              src="/static/logo.svg"
              alt="OnlineSIMCARD"
            />
          </div>
          {/* <Button color="inherit">Главная</Button> */}
          {/* <Button color="inherit">Контакты</Button> */}
          <Hidden xsDown>
            <Button color="inherit">Цены</Button>
            <Button color="inherit">Вход</Button>
          </Hidden>
          <Button color="secondary" variant="contained">
            Регистрация
          </Button>
        </Toolbar>
      </CustomContainer>
    </AppBar>
  );
};

export default Header;
