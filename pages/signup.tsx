import React from "react";
import Head from "next/head";
import { CssBaseline } from "@material-ui/core";

import Header from "../components/blocks/Header";
import RegisterPage from "../components/Register/RegisterPage";

export default function SignUp() {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <CssBaseline />
      <Header />
      <RegisterPage />
    </>
  );
}
