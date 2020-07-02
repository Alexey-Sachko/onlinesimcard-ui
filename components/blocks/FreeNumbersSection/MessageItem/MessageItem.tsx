import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import { Container, Pin, DataHumans, TextBody } from "./message-item.styled";

type Props = {
  text: string;
  data_humans: string;
};

const MessageItem: React.FC<Props> = ({ text, data_humans }) => {
  return (
    <Container>
      <Box display="flex">
        <Typography variant="h4">Мегафон</Typography> <Pin />
        <DataHumans variant="subtitle2">{data_humans}</DataHumans>
      </Box>
      <Box mt={2}>
        <TextBody variant="subtitle2">{text}</TextBody>
      </Box>
    </Container>
  );
};

export default MessageItem;