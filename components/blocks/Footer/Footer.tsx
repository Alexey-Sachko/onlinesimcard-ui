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
          }
          .inner-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-areas: "a b";
          }
          .item-left {
            max-width: 400px;
            grid-area: a;
          }
          .item-right {
            margin-left: auto;
            grid-area: b;
          }
          .logo-container {
            height: 100%;
            display: flex;
            align-items: center;
          }
          .email {
            margin-top: 30px;
            white-space: nowrap;
          }
          @media (max-width: 576px) {
            .inner-container {
              display: grid;
              text-align: center;
              grid-template-columns: auto;
              grid-template-rows: 0.5fr 1fr;
              grid-template-areas: "b" "a";
            }
            .item-right {
              margin: 0 auto 15px auto;
            }
            .container {
              padding-top: 25px;
              padding-bottom: 25px;
            }
            .email {
              margin-top: 15px;
              white-space: nowrap;
            }
          }
        `}
      </style>
      <CustomContainer>
        <div className="inner-container">
          <div className="item-left">
            <Typography variant="usualParagraph">
              Cервис по приему SMS-сообщений на виртуальные номера.
            </Typography>
            <div className="email">
              <Typography variant="h5" color="blueBasic">
                support@virtualnum.ru
              </Typography>
            </div>
          </div>
          <div className="item-right">
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
