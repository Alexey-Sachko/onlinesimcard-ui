import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import MessageItem from "../MessageItem";
import {
  CachedIcon,
  MessageContainer,
  TypographySpacing,
  ResetButton,
} from "./message-list.styled";
import messageData from "./message-data";

type Props = {
  data: any;
  onReloadMessages: () => void;
};

const MessageList: React.FC<Props> = ({ data, onReloadMessages }) => {
  return (
    <Box>
      <Box ml={4} display="flex">
        <TypographySpacing variant="h4">СООБЩЕНИЯ</TypographySpacing>
        <Box ml={3}>
          <ResetButton size="small" onClick={onReloadMessages}>
            <CachedIcon />
          </ResetButton>
        </Box>
      </Box>
      <MessageContainer mt={5} mb={7}>
        {data?.map(({ data_humans, text, in_number }, idx) => (
          <MessageItem
            key={idx}
            data_humans={data_humans}
            text={text}
            in_number={in_number}
          />
        ))}
      </MessageContainer>
    </Box>
  );
};

export default MessageList;
