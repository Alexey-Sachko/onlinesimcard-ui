import React, { useRef, useEffect, useState } from "react";

import { LinearProgress, Tooltip, withStyles } from "@material-ui/core";
import { gql } from "@apollo/client";
import { useSnackbar } from "notistack";

import {
  ActivationStatus,
  CountryType,
  DisplayActivationFragment,
} from "../../../lib/types";
import { toTimeString } from "./utils";
import CopyButton from "./CopyButton";
import { useServiceName } from "../Services/hooks";
import { ServiceIcon } from "../Services/ServiceIcon";
import { CountryIcon } from "../../layout/CountryIcon";

export const DISPLAY_ACTIVATION_FRAGMENT = gql`
  fragment DisplayActivation on ActivationType {
    id
    status
    phoneNum
    cost
    expiresAt
    serviceCode
    countryCode
    activationCodes {
      code
      id
    }
  }
`;

type ActivationProps = {
  activation: DisplayActivationFragment;
  countries: CountryType[] | undefined;
  onCancel: (activationId: number) => Promise<void> | void;
  onFinish: (activationId: number) => Promise<void> | void;
};

const Activation = ({
  activation,
  onCancel,
  onFinish,
  countries,
}: ActivationProps) => {
  const [expires, setExpires] = useState("");
  const serviceName = useServiceName(activation.serviceCode);
  const { enqueueSnackbar } = useSnackbar();
  const activationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setExpires(toTimeString(activation.expiresAt));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const cancelHandler = () => {
    const minute = 1000 * 60;

    const activationTime = new Date(activation.expiresAt).getTime();
    const currentTime = new Date().getTime();

    if (
      [ActivationStatus.WaitAgain, ActivationStatus.WaitCode].includes(
        activation.status
      ) &&
      activationTime - minute * 19.5 > currentTime
    ) {
      enqueueSnackbar(
        "Активацию можно завершить только спустя 30 сукунд или после приёма смс",
        { variant: "warning", autoHideDuration: 5000 }
      );
      return;
    }

    onCancel(activation.id);
  };

  const existMessages = [
    ActivationStatus.SmsRecieved,
    ActivationStatus.WaitAgain,
  ].includes(activation.status);

  const country = countries?.find(
    ({ code }) => code === activation.countryCode
  );

  const mobileBreakpointActivation = activationRef.current?.clientWidth <= 450;

  return (
    <>
      <div ref={activationRef} className="activation-container">
        <div className="title">
          <div className="title_country">
            <CountryIcon alpha2Code={country?.alpha2Code} width={24} />
          </div>
          {activation.phoneNum && (
            <>
              <div className="title_number">
                {activation.phoneNum}{" "}
                <div className="title_copy">
                  <CopyButton value={activation.phoneNum} />
                </div>
              </div>
            </>
          )}
          {mobileBreakpointActivation && <br />}
          {serviceName && (
            <div className="title_service">
              <div className="title_service__icon">
                <ServiceIcon
                  code={activation.serviceCode}
                  width="20"
                  height="20"
                />
              </div>

              {serviceName}
            </div>
          )}
          {expires && (
            <div className="title_timer">
              <div className="title_timer-icon">
                <img src="static/ic_outline-access-time.svg" alt="timer" />
              </div>
              <div className="title_timer-text">{expires}</div>
            </div>
          )}
        </div>
        <div className={`body${existMessages ? "" : " body--empty"}`}>
          <div className="body_title">
            Сообщения:
            {activation.activationCodes?.map(({ code }, idx) => (
              <div className="body_message" key={idx}>
                <div className="body_message_date">{idx + 1}</div>
                <div className="body_message_text">
                  {code}{" "}
                  <div className="body_message_text_copy-button">
                    <CopyButton value={code} />
                  </div>
                </div>
              </div>
            ))}
            <>
              <div className="body_message-empty">
                Ожидаем сообщение от {serviceName}...
              </div>
              <LinearProgress />
            </>
          </div>
        </div>
        <div className="actions">
          {existMessages ? (
            <>
              <div />
              {/* <button className="button get-more-sms-button">
                Получить {mobileBreakpointActivation && <br />} ещё СМС
              </button> */}
              <button
                onClick={() => onFinish(activation.id)}
                className="button over-use-button"
              >
                Закончить {mobileBreakpointActivation && <br />} использование
              </button>
            </>
          ) : (
            <>
              <div></div>

              <button
                onClick={cancelHandler}
                className="button over-use-button"
              >
                Отмена {mobileBreakpointActivation && <br />}
              </button>
            </>
          )}
        </div>
      </div>
      <style jsx>{`
        .activation-container {
          background: #ffffff;
          box-shadow: 0px 4px 6px rgba(99, 99, 99, 0.25);
          border-radius: 3px;
          border-left: 3px solid #806cb1;
        }
        .title {
          display: grid;
          align-items: center;
          padding: 10px 0 10px 20px;
        }
        .title_country {
          grid-area: country;
          display: flex;
          margin: auto 10px auto 0;
          width: 25px;
        }
        .title_number {
          grid-area: number;
          display: flex;
          align-items: center;
          color: #232628;
          font-weight: 600;
          font-size: 14px;
          line-height: 17px;
          font-family: "Inter", sans-serif;
          margin: auto 10px auto 0;
        }
        .title_copy {
          margin: 0 20px 0 10px;
          display: flex;
        }
        .title_service {
          grid-area: service;
          display: flex;
          align-items: center;
          font-weight: 600;
          font-size: 14px;
          line-height: 17px;
          color: #232628;
        }
        .title_service__icon {
          display: flex;
          align-items: center;
          margin-right: 10px;
        }
        .title_service__icon img {
          width: 100%;
          height: 100%;
        }
        .title_service:first-letter {
          text-transform: capitalize;
          font-family: "Inter", sans-serif;
        }
        .title_timer-icon {
          margin: auto 10px auto auto;
          display: flex;
        }
        .title_timer {
          grid-area: timer;
          display: flex;
          align-items: center;
          font-family: "Inter", sans-serif;
          font-weight: 600;
          font-size: 14px;
          line-height: 17px;
          color: #3b2f59;
          margin-right: 27px;
        }
        .body {
          background: #eae7f2;
          padding: 20px;
        }
        .body--empty {
          background: #fddae3;
        }
        .body_title {
          font-family: "Inter", sans-serif;
          font-size: 14px;
          line-height: 17px;
          color: #232628;
        }
        .body_message {
          display: flex;
          align-items: center;
          border: 1px solid #999999;
          border-radius: 3px;
          margin-top: 10px;
        }
        .body_message-empty {
          display: flex;
          align-items: center;
          border: 1px solid #999999;
          border-radius: 3px;
          margin-top: 10px;
          padding: 10px;
        }
        .body_message_date {
          font-family: "Inter", sans-serif;
          color: #ffffff;
          font-weight: 600;
          font-size: 14px;
          line-height: 17px;
          background: #806cb1;
          padding: 12px 11px;
        }
        .body_message_text {
          display: flex;
          align-items: center;
          font-family: "Inter", sans-serif;
          font-size: 14px;
          line-height: 17px;
          color: #232628;
          padding: 0 20px;
        }
        .body_message_text_copy-button {
          display: flex;
          margin: auto 0 auto 12px;
        }
        .actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 20px;
        }

        ======= .body_message_date {
          font-family: "Inter", sans-serif;
          color: #ffffff;
          font-weight: 600;
          font-size: 14px;
          line-height: 17px;
          background: #806cb1;
          padding: 12px 11px;
        }
        .body_message_text {
          display: flex;
          align-items: center;
          font-family: "Inter", sans-serif;
          font-size: 14px;
          line-height: 17px;
          color: #232628;
          padding: 0 20px;
        }
        .body_message_text_copy-button {
          display: flex;
          margin: auto 0 auto 12px;
        }
        .actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 20px;
        }

        .button {
          display: flex;
          padding: 10px 20px;
          font-size: 14px;
          line-height: 17px;
          font-family: "Inter", sans-serif;
          background: inherit;
          border: none;
          cursor: pointer;
          border-radius: 6px;
          transition: all ease-out 0.3s;
        }

        .button:disabled {
          cursor: default;
          box-shadow: none;
        }
        .button img {
          margin-left: 10px;
        }

        .get-more-sms-button {
          border: 1px solid #806cb1;
          color: #806cb1;
        }
        .get-more-sms-button:hover {
          color: #fff;
          font-weight: 500;
          background: #806cb1;
        }
        .over-use-button {
          border: 1px solid #f74874;
          color: #f74874;
        }
        .over-use-button:hover {
          color: #fff;
          font-weight: 500;
          background: #f74874;
        }
        .free-change-number-button {
          border: 1px solid #3b2f59;
          color: #3b2f59;
        }
        .free-change-number-button:hover {
          box-shadow: 0px 40px 80px rgba(15, 15, 15, 0.08),
            0px 15px 33.5px rgba(15, 15, 15, 0.06),
            0px 8.5px 18px rgba(15, 15, 15, 0.05),
            0px 4.5px 10px rgba(15, 15, 15, 0.04),
            0px 2px 5.3px rgba(15, 15, 15, 0.03),
            0px 0.6px 2.2px rgba(15, 15, 15, 0.02);
        }

        @media (max-width: 460px) {
          .button {
            padding: 8px 20px;
          }

          .title_number {
            margin-right: 0;
          }
        }
      `}</style>
      <style jsx>{`
        .button {
          padding: ${mobileBreakpointActivation ? "8px 20px" : "10px 20px"};
        }

        .title {
          grid-template-areas: ${mobileBreakpointActivation
            ? `"country number . ." "service service . timer"`
            : `"country number service timer"`};
          grid-template-columns: ${mobileBreakpointActivation
            ? "max-content max-content 1fr max-content"
            : "max-content max-content max-content 1fr"};
        }
        .title_service,
        .title_timer {
          margin-top: ${mobileBreakpointActivation ? "10px" : ""};
        }
      `}</style>
    </>
  );
};

export default Activation;

export const CustomTooltip = withStyles(() => ({
  tooltip: {
    fontSize: "12px",
    color: "#3B2F59",
    padding: "15px 20px",
    lineHeight: "150%",
    background: "#fff",
  },
}))(Tooltip);
