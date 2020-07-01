import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
// import Button from "@material-ui/core/Button";
import CustomContainer from "../CustomContainer";
import clsx from "clsx";
import Logo from "../../layout/Logo";
// import { useTypedSelector } from "../../../redux";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
// import Hidden from "@material-ui/core/Hidden";
// import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
// import { List, ListItem, ListItemText } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    boxShadow: "none",
    // transition: "background-color 0.3s ease",
  },
  rootBlueBg: {
    backgroundColor: "#fff",
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  logoContainer: {
    flexGrow: 1,
  },
  logoImg: {
    maxHeight: "25px",
    // [theme.breakpoints.up("lg")]: {
    //   maxHeight: "35px",
    // },
  },
  drawerList: {
    minWidth: "250px",
  },
}));

type Props = {
  blueBg?: boolean;
};

const Header: React.FC<Props> = ({ blueBg }) => {
  const classes = useStyles();
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
    <AppBar
      className={clsx(classes.root, {
        [classes.rootBlueBg]: isBlueHead || blueBg,
      })}
      position="fixed"
    >
      <CustomContainer>
        <Toolbar disableGutters>
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
          <div className={classes.logoContainer}>
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
        </Toolbar>
      </CustomContainer>
    </AppBar>
  );
};

export default Header;
