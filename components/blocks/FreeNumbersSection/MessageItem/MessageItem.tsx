import React from "react";

import Typography from "../../../layout/Typography";
import { theme } from "../../../../theme/customTheme";

type Props = {
  text: string;
  data_humans: string;
  in_number: string;
};

const MessageItem: React.FC<Props> = ({ text, data_humans, in_number }) => {
  return (
    <div className="container">
      <style jsx>
        {`
          .container {
            padding: 20px;
            border-bottom: 1px solid #e0e0e0;
          }
          .container:last-child {
            border-bottom: none;
          }
          .pin {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #85b1ff;
            margin-top: auto;
            margin-bottom: auto;
            margin-right: 15px;
            margin-left: 15px;
          }
          .date-humans {
            color: ${theme.colors.jetLight};
            margin-top: auto;
          }
          .text {
            color: ${theme.colors.jetMedium};
          }
          .message-header {
            display: flex;
          }

          .message-body {
            margin-top: 10px;
          }
        `}
      </style>
      <div className="message-header">
        <Typography variant="h5">{in_number}</Typography>{" "}
        <div className="pin" />
        <Typography className="date-humans" variant="usualParagraph">
          {data_humans}
        </Typography>
      </div>
      <div className="message-body">
        <Typography className="text" variant="usualParagraph">
          {text}
        </Typography>
      </div>
    </div>
  );
};

export default MessageItem;
