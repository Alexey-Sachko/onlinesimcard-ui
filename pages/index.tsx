import React, { useState } from "react";
import Head from "next/head";
import Box from "@material-ui/core/Box";
import axios from "axios";

import Header from "../components/blocks/Header";
import MainSection from "../components/blocks/MainSection";
import Footer from "../components/blocks/Footer";
import HowToSection from "../components/blocks/HowToSection";
import ChooseServiceModal from "../components/blocks/ChooseServiceModal";
import FreeNumbersSection from "../components/blocks/FreeNumbersSection";

type Props = {
  numbersData?: any;
  messagesData?: any;
};

const Home = ({ numbersData, messagesData }: Props) => {
  const [isOpenChooseService, setIsOpenChooseService] = useState(false);

  const openModalHandler = () => {
    setIsOpenChooseService(true);
  };

  return (
    <div style={{ background: "#fff" }}>
      <Head>{/* <title>Home</title> */}</Head>
      <Header />
      <Box height="120px" />
      <MainSection onActionClick={openModalHandler} />
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
