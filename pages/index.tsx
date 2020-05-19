import React from "react";
import Head from "next/head";

import Header from "../components/Header";
import MainSection from "../components/MainSection";

const Home = () => (
  <div>
    <Head>{/* <title>Home</title> */}</Head>
    <Header />
    <MainSection />
  </div>
);

export default Home;
