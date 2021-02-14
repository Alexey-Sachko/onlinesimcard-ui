import React, { useState } from "react";
import Head from "next/head";

import Header from "../components/Header";
import MainSection from "../components/blocks/MainSection";
import Footer from "../components/blocks/Footer";
// import HowToSection from "../components/blocks/HowToSection";
// import ChooseServiceModal from "../components/blocks/ChooseServiceModal";
import FreeNumbersSection from "../components/blocks/FreeNumbersSection";
import { themeBasic } from "../theme/customTheme";
import ThemeContext from "../theme/ThemeContext";
import { DefaultAction } from "../components/Header/actions";

const Home = () => {
  const [isShowNotify, setIsShowNotify] = useState(false);

  return (
    <div>
      <ThemeContext.Provider value={themeBasic}>
        <Head>
          <meta
            name="description"
            lang="ru"
            content="Приём смс на виртуальные номера для регистрации вк, инстаграм, whatsapp, телеграм, delivery club и других сайтов"
          />
        </Head>
        <Header fullWidth="1380px" secondaryAction={<DefaultAction />} />

        <MainSection />
        <FreeNumbersSection setIsShowNotify={setIsShowNotify} />

        <Footer />
        {/* <Notifier reset={isShowNotify} /> */}
      </ThemeContext.Provider>

      <style jsx global>{`
        body {
          background-color: #fff;
        }
      `}</style>
    </div>
  );
};

export default Home;
