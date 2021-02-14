import React, { useRef } from "react";

import MessageItem from "../MessageItem";

import countrySettings from "../country-settings";

import { FreeNumbers } from "../types";
import prepareNumber from "../../../../helpers/prepareNumber";
import { useTheme } from "../../../hooks/useTheme";
import { SetUseState } from "../NumberItem/NumberItem";
import BackdropLoader from "../../../layout/BackdropLoader";

type Props = {
  freeNumbers: FreeNumbers;
  onReloadFreeNumbers: () => void;
  setPage?: SetUseState<number>;
  loading?: boolean;
};

const MessageList: React.FC<Props> = ({
  freeNumbers,
  onReloadFreeNumbers,
  setPage,
  loading,
}) => {
  const messagesBodyRef = useRef<HTMLDivElement>(null);
  const scrollHandler = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (
      messagesBodyRef.current.scrollHeight ===
      messagesBodyRef.current.scrollTop + 550
    ) {
      setPage((prevPage) => (prevPage += 1));
    }
  };

  const theme = useTheme();
  const { messages, numbers } = freeNumbers || {};
  const { number = "", country, data } = messages || {};
  const dataSelectedNumber = numbers?.[number || ""];
  const { data_humans = "" } = dataSelectedNumber || {};

  const countrySetting = countrySettings[country];

  const onCopy = () => {
    navigator.clipboard.writeText(dataSelectedNumber?.full_number || "");
  };

  return (
    <>
      <div className="messages-container">
        <BackdropLoader open={loading} />
        <div className="messages-header" onClick={onCopy}>
          <div className="messages-header__flag-icon">
            {countrySetting?.flagComp}
          </div>
          <div className="messages-header__number">
            +{country}{" "}
            {prepareNumber(
              number,
              countrySetting?.regexp,
              countrySetting?.mask
            )}
          </div>
          <div className="messages-header__copy-icon">
            <img src="/static/copy-icon.svg" alt="copy-icon" />
          </div>
          {data_humans && (
            <div className="messages-header__time-add-number">
              Номер добавлен {data_humans}
            </div>
          )}

          <div
            className="messages-header__reload-block"
            onClick={onReloadFreeNumbers}
          >
            <div
              className={`messages-header__reload-block-icon ${
                loading ? "messages-header__reload-block-icon-rotate" : ""
              }`}
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0)">
                  <path
                    d="M13.2899 2.50611C11.1728 2.44332 9.0904 3.05445 7.34296 4.2514C5.59552 5.44835 4.27331 7.16928 3.56694 9.16611C3.52308 9.28994 3.50404 9.42121 3.51091 9.5524C3.51778 9.6836 3.55042 9.81215 3.60697 9.93073C3.66352 10.0493 3.74287 10.1556 3.8405 10.2435C3.93812 10.3314 4.05211 10.3992 4.17594 10.4431C4.29978 10.487 4.43104 10.506 4.56224 10.4991C4.69343 10.4923 4.82199 10.4596 4.94057 10.4031C5.05915 10.3465 5.16543 10.2672 5.25335 10.1696C5.34126 10.0719 5.40908 9.95794 5.45294 9.83411C5.9034 8.55982 6.66943 7.42047 7.6795 6.52245C8.68958 5.62442 9.91076 4.99702 11.229 4.69881C12.5473 4.40061 13.9196 4.44134 15.2178 4.81719C16.5161 5.19304 17.6979 5.89176 18.6529 6.84811C18.6605 6.85556 18.6682 6.8629 18.6759 6.87011L21.4749 9.50011H17.9999C17.7347 9.50011 17.4804 9.60546 17.2928 9.793C17.1053 9.98054 16.9999 10.2349 16.9999 10.5001C16.9999 10.7653 17.1053 11.0197 17.2928 11.2072C17.4804 11.3947 17.7347 11.5001 17.9999 11.5001H23.9999C24.0334 11.4998 24.0667 11.4978 24.0999 11.4941C24.1328 11.4914 24.1655 11.4871 24.1979 11.4811C24.1986 11.4811 24.1993 11.4811 24.1999 11.4811C24.2641 11.4676 24.3267 11.4479 24.3869 11.4221C24.3876 11.4221 24.3883 11.4221 24.3889 11.4221C24.3896 11.4221 24.3903 11.4221 24.3909 11.4221C24.421 11.4086 24.4504 11.3935 24.4789 11.3771C24.507 11.3621 24.5344 11.3457 24.5609 11.3281C24.5623 11.3274 24.5636 11.3268 24.5649 11.3261C24.5663 11.3251 24.5676 11.3241 24.5689 11.3231C24.5944 11.3059 24.6191 11.2876 24.6429 11.2681C24.6436 11.2674 24.6443 11.2668 24.6449 11.2661C24.6701 11.2446 24.6941 11.2219 24.7169 11.1981C24.7406 11.1736 24.7629 11.1479 24.7839 11.1211C24.8023 11.0985 24.8196 11.0752 24.8359 11.0511C24.838 11.0478 24.84 11.0444 24.8419 11.0411C24.8433 11.0384 24.8446 11.0358 24.8459 11.0331C24.9159 10.9224 24.9635 10.7991 24.9859 10.6701C24.992 10.637 24.9963 10.6036 24.9989 10.5701C25.0001 10.5468 25.0004 10.5234 24.9999 10.5001V4.50011C25.0017 4.36642 24.9766 4.23374 24.9262 4.10992C24.8758 3.98609 24.8011 3.87363 24.7064 3.77919C24.6118 3.68474 24.4992 3.61024 24.3753 3.56007C24.2513 3.5099 24.1186 3.48509 23.9849 3.48711C23.7201 3.49106 23.4676 3.59994 23.2829 3.78987C23.0982 3.97979 22.9965 4.23522 22.9999 4.50011V8.19011L20.0669 5.43411C18.264 3.62897 15.8391 2.58146 13.2889 2.50611H13.2899ZM1.95994 13.4911C1.81916 13.4953 1.68085 13.5292 1.55407 13.5906C1.42729 13.6519 1.31491 13.7394 1.22428 13.8472C1.13365 13.955 1.06681 14.0807 1.02815 14.2162C0.989494 14.3516 0.97988 14.4937 0.999943 14.6331V20.5001C0.999943 20.6314 1.02581 20.7615 1.07606 20.8828C1.12632 21.0041 1.19998 21.1144 1.29284 21.2072C1.3857 21.3001 1.49593 21.3737 1.61726 21.424C1.73859 21.4742 1.86862 21.5001 1.99994 21.5001C2.13127 21.5001 2.2613 21.4742 2.38263 21.424C2.50395 21.3737 2.61419 21.3001 2.70705 21.2072C2.79991 21.1144 2.87357 21.0041 2.92382 20.8828C2.97408 20.7615 2.99994 20.6314 2.99994 20.5001V16.8101L5.93394 19.5671C7.73657 21.372 10.161 22.4194 12.7108 22.4949C15.2606 22.5704 17.7427 21.6682 19.6489 19.9731C20.9119 18.8508 21.87 17.4268 22.4339 15.8341C22.4778 15.7102 22.4968 15.5789 22.4899 15.4476C22.483 15.3164 22.4504 15.1878 22.3938 15.0691C22.3372 14.9505 22.2578 14.8442 22.1601 14.7562C22.0624 14.6683 21.9483 14.6005 21.8244 14.5566C21.7005 14.5127 21.5692 14.4937 21.438 14.5006C21.3067 14.5075 21.1781 14.5402 21.0595 14.5968C20.8199 14.7111 20.6355 14.9159 20.5469 15.1661C20.0966 16.4405 19.3307 17.5799 18.3206 18.4781C17.3106 19.3762 16.0894 20.0037 14.7712 20.302C13.4529 20.6003 12.0806 20.5597 10.7823 20.1839C9.48395 19.8081 8.30206 19.1094 7.34694 18.1531C7.33939 18.1457 7.33173 18.1383 7.32394 18.1311L4.52594 15.5011H7.99994C8.26516 15.5011 8.51951 15.3957 8.70705 15.2082C8.89459 15.0207 8.99994 14.7663 8.99994 14.5011C8.99994 14.2359 8.89459 13.9815 8.70705 13.794C8.51951 13.6065 8.26516 13.5011 7.99994 13.5011H2.12494C2.06998 13.4932 2.01446 13.4898 1.95894 13.4911H1.95994Z"
                    fill="#F74874"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect
                      width="24.01"
                      height="24.01"
                      fill="white"
                      transform="translate(0.98999 0.495117)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <span className="messages-header__reload-block-title">
              Обновить
            </span>
          </div>
        </div>
        <div className="messages-body-container">
          <div
            ref={messagesBodyRef}
            className="messages-body"
            onScroll={scrollHandler}
          >
            {data?.map(({ data_humans, text, in_number }, idx) => (
              <MessageItem
                key={idx}
                data_humans={data_humans}
                text={text}
                in_number={in_number}
              />
            ))}
          </div>
        </div>
      </div>
      <style jsx>
        {`
          @-moz-keyframes spin {
            from {
              -moz-transform: rotate(0deg);
            }
            to {
              -moz-transform: rotate(360deg);
            }
          }
          @-webkit-keyframes spin {
            from {
              -webkit-transform: rotate(0deg);
            }
            to {
              -webkit-transform: rotate(360deg);
            }
          }
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          .messages-container {
            background: #fff;
            border-radius: 5px;
            padding: 25px 0 0 0;
            border-radius: 10px;
            position: relative;
          }

          .messages-header__flag-icon {
            display: flex;
            align-items: center;
            width: 27px;
            min-width: 27px;
            margin-right: 10px;
          }

          .messages-header__flag-icon img {
            width: 100%;
          }

          .messages-header__number {
            font-weight: 600;
            font-size: 18px;
            line-height: 22px;
            color: #232628;
            margin-right: 10px;
            cursor: pointer;
          }
          .messages-header {
            display: flex;
            align-items: center;
            padding: 0 25px 20px 25px;
          }

          .messages-header__copy-icon {
            display: flex;
            align-items: center;
            width: 19px;
            min-width: 19px;
            cursor: pointer;
            margin-right: 30px;
          }

          .messages-header__copy-icon img {
            width: 100%;
          }

          .messages-header__time-add-number {
            background: #e9e8f1;
            padding: 5px 10px;
            font-size: 18px;
            font-weight: 400;
            color: ${theme.colors.textPrimary};
            border-radius: 5px;
          }

          .messages-header__reload-block {
            margin-left: auto;
            display: flex;
            align-items: center;
            cursor: pointer;
          }

          .messages-header__reload-block-title {
            color: ${theme.colors.primary};
            font-weight: 400;
            font-size: 15px;
            line-height: 18px;
          }
          .messages-header__reload-block-icon {
            margin-right: 10px;
            display: flex;
            align-items: center;
            width: 25px;
          }

          .messages-header__reload-block-icon-rotate {
            animation: spin 1s linear infinite;
          }
          .messages-body-container {
            border-top: 1px solid #e0e0e0;
          }
          .messages-body {
            max-height: 550px;
            overflow-y: auto;
            padding-left: 25px;
          }

          @media (max-width: 1276px) {
            .messages-header__time-add-number {
              display: none;
            }
          }

          @media (max-width: 768px) {
            .messages-header__number {
              font-size: 16px;
            }

            .messages-header__reload-block-title {
              font-size: 14px;
            }

            .messages-header__reload-block-icon {
              width: 20px;
              height: 20px;
            }

            .messages-header__copy-icon {
              margin-right: 5px;
            }

            .messages-header {
              padding: 0 10px 20px 10px;
            }

            .messages-body {
              padding-left: 10px;
            }
          }
        `}
      </style>
    </>
  );
};

export default MessageList;
