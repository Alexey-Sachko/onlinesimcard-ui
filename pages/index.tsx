import React, { useState } from "react";
import Head from "next/head";

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
  const [isOpenChooseService, setIsOpenChooseService] = useState(false);
  const [isShowNotify, setIsShowNotify] = useState(false);

  const openModalHandler = () => {
    setIsOpenChooseService(true);
  };

  return (
    <div>
      <ThemeContext.Provider value={themeBasic}>
        <Head>{/* <title>Home</title> */}</Head>
        <Header />

        <MainSection />
        {/* <HowToSection onActionClick={openModalHandler} /> */}
        <FreeNumbersSection setIsShowNotify={setIsShowNotify} />
        {/* <ChooseServiceModal
        open={isOpenChooseService}
        onClose={() => setIsOpenChooseService(false)}
      /> */}
        <Footer />
        <Notifier reset={isShowNotify} />
      </ThemeContext.Provider>
    </div>
  );
};

export default Home;
