import React, { useState } from "react";
import Head from "next/head";
import { Box, Button } from "@material-ui/core";
import { useRouter } from "next/router";

import Header from "../components/blocks/Header";
import MainSection from "../components/blocks/MainSection";
import Footer from "../components/blocks/Footer";
// import HowToSection from "../components/blocks/HowToSection";
// import ChooseServiceModal from "../components/blocks/ChooseServiceModal";
import FreeNumbersSection from "../components/blocks/FreeNumbersSection";
import Notifier from "../components/blocks/Notifier";
import { themeBasic } from "../theme/customTheme";
import ThemeContext from "../theme/ThemeContext";

const Home = () => {
  const [isShowNotify, setIsShowNotify] = useState(false);
  const router = useRouter();

  return (
    <div>
      <ThemeContext.Provider value={themeBasic}>
        <Head>{/* <title>Home</title> */}</Head>
        <Header
          secondaryAction={
            <Box display="flex">
              <Button
                color="primary"
                onClick={() => router.push("/signin")}
                style={{ marginRight: "5px" }}
              >
                Войти
              </Button>
              <Button
                color="secondary"
                variant="outlined"
                onClick={() => router.push("/signup")}
              >
                Регистрация
              </Button>
            </Box>
          }
        />

        <MainSection />
        <FreeNumbersSection setIsShowNotify={setIsShowNotify} />

        <Footer />
        <Notifier reset={isShowNotify} />
      </ThemeContext.Provider>
    </div>
  );
};

export default Home;
