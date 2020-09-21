import React, { useState } from "react";

import Header from "../components/blocks/Header";
import MainSection from "../components/blocks/MainSection";
import Footer from "../components/blocks/Footer";
// import HowToSection from "../components/blocks/HowToSection";
// import ChooseServiceModal from "../components/blocks/ChooseServiceModal";
import FreeNumbersSection from "../components/blocks/FreeNumbersSection";
import Notifier from "../components/blocks/Notifier";

const Home = () => {
  const [isOpenChooseService, setIsOpenChooseService] = useState(false);
  const [isShowNotify, setIsShowNotify] = useState(false);

  const openModalHandler = () => {
    setIsOpenChooseService(true);
  };

  return (
    <div>
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
    </div>
  );
};

export default Home;
