import React, { useMemo } from "react"

import Typography from "../../../layout/Typography"
import { useTheme } from "../../../hooks/useTheme"
import CopyIcon from "../../../icons/CopyIcon"
import servicesIcon from "../services-icon"

type Props = {
  text: string
  data_humans: string
  in_number: string
}

const MessageItem: React.FC<Props> = ({ text, data_humans, in_number }) => {
  const theme = useTheme()

  const newText = useMemo(() => {
    const regex = /\d/
    const codeMessage = text.split(/\s/)?.filter((el) => el.match(regex)) || []
    return codeMessage.join(" ")?.replace(/[.,!]/, "")
  }, [text])

  const onCopy = () => {
    navigator.clipboard.writeText(newText)
  }

  return (
    <div className="container">
      <style jsx>
        {`
          .container {
            padding: 15px 25px 15px 0;
            display: flex;
          }

          .container:not(:last-child) {
            border-bottom: 1px solid #e0e0e0;
          }

          .date-humans {
            color: ${theme.colors.jetLight};
            margin-top: auto;
          }
          .message-content {
            width: 100%;
          }

          .message-header {
            display: flex;
          }

          .message-body {
            margin-top: 10px;
            display: flex;
          }

          .message__icon {
            min-width: 27px;
            max-width: 27px;
            margin-right: 10px;
          }

          .message__icon img {
            width: 100%;
          }

          .message-header-item {
            max-width: 48%;
            white-space: nowrap;
            overflow: hidden;
          }

          .in_number {
            color: #222d32;
            font-weight: 700;
            font-size: 15px;
            line-height: 18.15px;
          }

          .data-humans {
            margin-left: auto;
            color: #999999;
            font-size: 15px;
            font-weight: 400;
            line-height: 18.15px;
          }

          .message-body__text {
            color: #616161;
            font-weight: 400;
            font-size: 15px;
            line-height: 18.15px;
            margin-right: 40px;
          }

          .message-body-copy-code {
            display: flex;
            align-items: center;
            margin-left: auto;
            color: ${theme.colors.primary};
            border: 1px solid ${theme.colors.primary};
            padding: 10px 12px;
            border-radius: 5px;
            white-space: nowrap;
            cursor: pointer;
          }
          .message-body-copy-icon {
            width: 19px;
            height: 19px;
            margin-left: 12px;
          }
          .code {
            font-weight: 700;
            margin-left: 5px;
            max-width: 150px;
            overflow-x: auto;
          }

          @media (max-width: 768px) {
            .in_number,
            .message-body__text,
            .data-humans,
            .code,
            .message-body-copy-code {
              font-size: 14px;
            }
            .message-body {
              flex-direction: column;
            }

            .message-body-copy-code {
              margin: 10px auto 0 0;
            }

            .container {
              padding: 15px 10px 15px 0;
            }

            .code {
              max-width: 100px;
            }
          }
        `}
      </style>
      <div className="message__icon">
        <img
          src={servicesIcon[in_number?.toUpperCase()] || servicesIcon.DEFAULT}
          alt="service-icon"
        />
      </div>
      <div className="message-content">
        <div className="message-header">
          <div className="message-header-item in_number">{in_number}</div>

          <div className="message-header-item data-humans">{data_humans}</div>
        </div>
        <div className="message-body">
          <div className="message-body__text">{text}</div>

          {newText && (
            <div className="message-body-copy-code" onClick={onCopy}>
              Код из смс: <span className="code"> {newText}</span>
              <div className="message-body-copy-icon">
                <img src="/static/copy-icon-primary.svg" alt="copy-icon" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MessageItem
