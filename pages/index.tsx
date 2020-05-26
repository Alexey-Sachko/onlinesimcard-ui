import React, { useState } from "react";
import Head from "next/head";

import Header from "../components/Header";
import MainSection from "../components/MainSection";
import Footer from "../components/Footer";
import HowToSection from "../components/HowToSection";
import ChooseServiceModal from "../components/ChooseServiceModal";

const Home = () => {
  const [isOpenChooseService, setIsOpenChooseService] = useState(false);

  const openModalHandler = () => {
    setIsOpenChooseService(true);
  };

  return (
    <div>
      <Head>{/* <title>Home</title> */}</Head>
      <Header />
      <MainSection onActionClick={openModalHandler} />
      <HowToSection onActionClick={openModalHandler} />
      <ChooseServiceModal
        open={isOpenChooseService}
        onClose={() => setIsOpenChooseService(false)}
      />
      <Footer />
    </div>
  );
};

export default Home;
