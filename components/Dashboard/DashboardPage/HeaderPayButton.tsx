import React from "react";
import { useHistory } from "react-router-dom";

export const HeaderPayButton = () => {
  const history = useHistory();

  const navigate = (to: string) => () => {
    history.push(to);
  };
  return (
    <>
      <button onClick={navigate("/pay")} className="header-on-pay">
        Пополнить
      </button>

      <style jsx>
        {`
          .header-on-pay {
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 30px;
            background: #f74874;
            outline: none;
            cursor: pointer;
            padding: 5px 15px;
            border: none;
            font-size: 13px;
            color: #fff;
            font-weight: bold;
            font-family: "Inter", sans-serif;
            font-style: normal;
            transition: 0.2s ease-out box-shadow, 0.2s ease-out background-color;
             {
              /* height: 39px; */
            }
            margin: auto 0;
          }

          .header-on-pay:hover {
            background: #de4168;
            box-shadow: 0px 40px 80px rgba(15, 15, 15, 0.08),
              0px 15px 33.5px rgba(15, 15, 15, 0.06),
              0px 8.5px 18px rgba(15, 15, 15, 0.05),
              0px 4.5px 10px rgba(15, 15, 15, 0.04),
              0px 2px 5.3px rgba(15, 15, 15, 0.03),
              0px 0.6px 2.2px rgba(15, 15, 15, 0.02);
          }

          .header-on-pay:focus {
            background: #c83a5e;
            box-shadow: 0px 40px 80px rgba(15, 15, 15, 0.08),
              0px 15px 33.5px rgba(15, 15, 15, 0.06),
              0px 8.5px 18px rgba(15, 15, 15, 0.05),
              0px 4.5px 10px rgba(15, 15, 15, 0.04),
              0px 2px 5.3px rgba(15, 15, 15, 0.03),
              0px 0.6px 2.2px rgba(15, 15, 15, 0.02);
          }
        `}
      </style>
    </>
  );
};
