import React, { useState } from "react";
import Head from "next/head";

import Header from "../components/blocks/Header";
import MainSection from "../components/blocks/MainSection";
import Footer from "../components/blocks/Footer";
// import HowToSection from "../components/blocks/HowToSection";
// import ChooseServiceModal from "../components/blocks/ChooseServiceModal";
import FreeNumbersSection from "../components/blocks/FreeNumbersSection";

const Home = () => {
  const [isOpenChooseService, setIsOpenChooseService] = useState(false);

  const openModalHandler = () => {
    setIsOpenChooseService(true);
  };

  return (
    <div style={{ background: "#fff" }}>
      <Head>{/* <title>Home</title> */}</Head>
      <Header />
      <div style={{ height: "120px" }} />
      <MainSection />
      {/* <HowToSection onActionClick={openModalHandler} /> */}
      <FreeNumbersSection />
      {/* <ChooseServiceModal
        open={isOpenChooseService}
        onClose={() => setIsOpenChooseService(false)}
      /> */}
      <Footer />
    </div>
  );
};

export default Home;
