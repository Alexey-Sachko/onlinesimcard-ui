import React from "react";
import Head from "next/head";

import Header from "../components/Header";
import MainSection from "../components/MainSection";
import Footer from "../components/Footer";

const Home = () => (
  <div>
    <Head>{/* <title>Home</title> */}</Head>
    <Header />
    <MainSection />
    <Footer />
  </div>
);

export default Home;
