import React, { useEffect, useState } from "react";
import { Toolbar, AppBar, makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";

import Logo from "../../layout/Logo";

const useStyles = makeStyles({
  toolbar: {
    justifyContent: "space-between",
  },
});

type HeaderProps = {
  secondaryAction?: React.ReactNode;
};

const Header: React.FC<HeaderProps> = ({ secondaryAction }) => {
  const classes = useStyles();
  const [isBlueHead, setIsBlueHead] = useState(false);
  const router = useRouter();

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

        {secondaryAction}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
