import React from "react";
import { Box, Paper, Typography } from "@material-ui/core";

import { ActivationStatus, ActivationType } from "../../../lib/types";
import Activation from "./Activation";

const mock: ActivationType[] = [
  {
    cost: 100,
    id: 1,
    expiresAt: new Date(new Date().getTime() + 1000 * 60 * 20).toISOString(),
    phoneNum: "+7 (908) 924-88-27",
    status: ActivationStatus.WaitCode,
    sourceActivationId: "12039810",
  },
];

const CurrentActivations = () => {
  return (
    <Paper style={{ height: "100%" }}>
      <Box px={3} py={2}>
        <Box mb={2}>
          <Typography>Операции:</Typography>
        </Box>

        {mock.map((activation) => (
          <Activation key={activation.id} activation={activation} />
        ))}
      </Box>
    </Paper>
  );
};

export default CurrentActivations;
