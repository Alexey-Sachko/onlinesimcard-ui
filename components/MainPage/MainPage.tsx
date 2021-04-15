import React from "react";
import FreeNumbersSection from "../blocks/FreeNumbersSection";
import { DefaultAction } from "../Header/actions";
import { HeaderLight } from "../HeaderLight";
import { FeaturesSection } from "./sections/FeaturesSection";
import { Footer } from "./sections/Footer";
import { HowSection } from "./sections/HowSection";
import { MainSection } from "./sections/MainSection";

export const MainPage = () => {
  return (
    <div>
      <HeaderLight navbarContent={<DefaultAction />} />
      <MainSection />
      <FeaturesSection />
      {/* <HowSection /> */}
      <FreeNumbersSection />
      <Footer />
    </div>
  );
};
