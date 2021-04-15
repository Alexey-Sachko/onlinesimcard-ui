import React from "react";
import Head from "next/head";

import { themeBasic } from "../theme/customTheme";
import ThemeContext from "../theme/ThemeContext";
import { MainPage } from "../components/MainPage/MainPage";

const Home = () => (
  <div>
    <ThemeContext.Provider value={themeBasic}>
      <Head>
        <meta
          name="description"
          lang="ru"
          content="Приём смс на виртуальные номера для регистрации вк, инстаграм, whatsapp, телеграм, delivery club и других сайтов"
        />
      </Head>
      <MainPage />
    </ThemeContext.Provider>

    <style jsx global>{`
      body {
        background-color: #fff;
      }
    `}</style>
  </div>
);

export default Home;
