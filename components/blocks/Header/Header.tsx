import React, { useEffect, useState } from "react";

import CustomContainer from "../CustomContainer";
import Logo from "../../layout/Logo";
import { useTheme } from "../../hooks/useTheme";
// import { useTypedSelector } from "../../../redux";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
// import Hidden from "@material-ui/core/Hidden";
// import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
// import { List, ListItem, ListItemText } from "@material-ui/core";

const Header: React.FC = () => {
  const theme = useTheme();
  const [isBlueHead, setIsBlueHead] = useState(false);
  // const { email } = useTypedSelector((s) => s.user);
  // const [drawerAnchor, setDrawerAnchor] = useState(false);

  // const toggleDrawer = (open: boolean) => (
  //   event: React.KeyboardEvent | React.MouseEvent
  // ) => {
  //   if (
  //     event &&
  //     event.type === "keydown" &&
  //     ((event as React.KeyboardEvent).key === "Tab" ||
  //       (event as React.KeyboardEvent).key === "Shift")
  //   ) {
  //     return;
  //   }

  //   setDrawerAnchor(open);
  // };

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

  return (
    <div className="navbar-container">
      <style jsx>
        {`
          .navbar-container {
            display: flex;
            position: sticky;
            top: 0;
            background: ${theme.colors.whiteBasic};
          }
          .logo-container {
            flex-grow: 1;
            padding: 10px 0;
          }
        `}
      </style>
      <style jsx>
        {`
          .navbar-container {
            box-shadow: ${isBlueHead ? theme.shadows.usualShadow : "initial"};
          }
        `}
      </style>
      <CustomContainer>
        {/* <Toolbar disableGutters> */}
        {/* <Hidden smUp implementation="css">
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
          </Hidden> */}
        {/* <Link href="/">
            <a className={classes.title}>
              <img
                className={classes.logoImg}
                src="/static/logo.svg"
                alt="OnlineSIMCARD"
              />
            </a>
          </Link> */}
        <div className="logo-container">
          <Logo />
        </div>
        {/* <Button color="inherit">Главная</Button> */}
        {/* <Button color="inherit">Контакты</Button> */}
        {/* <Hidden xsDown>
            <Button color="inherit">Цены</Button>
            <Button color="inherit">Вход</Button>
          </Hidden> */}
        {/* {email} */}
        {/* <Link href="/signup">
            <a style={{ textDecoration: "none" }}>
              <Button color="secondary" variant="contained">
                Регистрация
              </Button>
            </a>
          </Link> */}
        {/* </Toolbar> */}
      </CustomContainer>
    </div>
  );
};

export default Header;
