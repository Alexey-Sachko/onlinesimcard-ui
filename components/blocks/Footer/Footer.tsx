import React from "react";

import Typography from "../../layout/Typography";
import Logo from "../../layout/Logo";
import CustomContainer from "../CustomContainer";

const Footer = () => {
  return (
    <div className="container">
      <style jsx>
        {`
          .container {
            padding-top: 50px;
            padding-bottom: 50px;
          }
          .grid-container {
            width: 100%;
            display: flex;
          }
          .grid-item-left {
            width: 50%;
          }
          .grid-item-right {
            width: 50%;
            display: flex;
            justify-content: flex-end;
          }
          .logo-container {
            height: 100%;
            display: flex;
            align-items: center;
          }
          .separator {
            margin-top: 30px;
          }
        `}
      </style>
      <CustomContainer>
        <div className="grid-container">
          <div className="grid-item-left">
            <Typography variant="usualParagraph">
              Cервис по приему SMS-сообщений на виртуальные номера.
            </Typography>
            <div className="separator"></div>
            <Typography variant="h5" color="blueBasic">
              simcardonline@mail.ru
            </Typography>
          </div>
          <div className="grid-item-right">
            <div className="logo-container">
              <Logo />
            </div>
          </div>
        </div>
      </CustomContainer>
    </div>
  );
};

export default Footer;
