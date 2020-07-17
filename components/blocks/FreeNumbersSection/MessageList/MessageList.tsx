import React from "react";

import Typography from "../../../layout/Typography";
import MessageItem from "../MessageItem";
import IconButton from "../../../layout/IconButton";

type Props = {
  data: any;
  onReloadMessages: () => void;
};

const MessageList: React.FC<Props> = ({ data, onReloadMessages }) => {
  return (
    <>
      <style jsx>
        {`
          .messages-container {
            background: #fff;
            border-radius: 5px;
            box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
            margin-top: 1.5vw;
            margin-bottom: 35px;
          }
          .message-list-title {
            margin-left: 20px;
            display: flex;
            align-items: center;
          }
          .message-list-button {
            margin-left: 15px;
          }
          .title-text {
            letter-spacing: 1.5px;
            white-space: nowrap;
          }
          .reset-button-img {
            width: 100%;
          }
          .message-list-title span {
            letter-spacing: 1.5px;
            white-space: nowrap;
          }

          @media (max-width: 576px) {
            .messages-container {
              margin-top: 10px;
            }
            .message-list-title {
              align-items: center;
            }
          }
        `}
      </style>
      <div className="message-list-title">
        <span>
          <Typography className="title-text" variant="h5">
            СООБЩЕНИЯ
          </Typography>
        </span>

        <div className="message-list-button">
          <IconButton onClick={onReloadMessages}>
            <img
              className="reset-button-img"
              src="/static/reset-alternative.svg"
            />
          </IconButton>
        </div>
      </div>
      <div className="messages-container">
        {data?.map(({ data_humans, text, in_number }, idx) => (
          <MessageItem
            key={idx}
            data_humans={data_humans}
            text={text}
            in_number={in_number}
          />
        ))}
      </div>
    </>
  );
};

export default MessageList;
