import React from "react";

import Typography from "../../layout/Typography";
import CustomContainer from "../CustomContainer";

const Footer = () => {
  return (
    <div className="container">
      <style jsx>
        {`
          .container {
            padding-top: 35px;
            padding-bottom: 35px;
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
            flex-direction: column;
            justify-content: center;
          }

          .kassa-logo-wrap {
            margin-top: 8px;
          }

          .email {
            margin-top: 20px;
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
              <div>
                <a href="/oferta">Публичная оферта</a>
              </div>
              <a href="/privacy">Политика конфиденциальности</a>
              <a href="//freekassa.ru/" className="kassa-logo-wrap">
                <img
                  src="//www.free-kassa.ru/img/fk_btn/13.png"
                  title="Приём оплаты на сайте картами"
                />
              </a>
            </div>
          </div>
        </div>
      </CustomContainer>
    </div>
  );
};

export default Footer;
