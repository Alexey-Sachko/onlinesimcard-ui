import React, { useEffect, useState } from "react";
import { Button, Toolbar, AppBar, makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";
import ym from "react-yandex-metrika";

import Logo from "../../layout/Logo";

const useStyles = makeStyles({
  toolbar: {
    justifyContent: "space-between",
  },
});

const Header: React.FC = () => {
  const classes = useStyles();
  const [isBlueHead, setIsBlueHead] = useState(false);
  const router = useRouter();

  const handleRegister = () => {
    ym("reachGoal", "NAVBAR_CLICK_SIGNUP");
    router.push("/signup");
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

  return (
    <AppBar position="sticky" color="inherit">
      <Toolbar className={classes.toolbar}>
        <Logo />
        <Button color="primary" variant="outlined" onClick={handleRegister}>
          Регистрация
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
