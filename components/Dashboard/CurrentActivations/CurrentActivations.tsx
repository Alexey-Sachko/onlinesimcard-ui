import React from "react";
import { Box, Paper, Typography } from "@material-ui/core";
import { gql } from "@apollo/client";

import {
  ActivationStatus,
  ActivationType,
  useMyCurrentActivationsQuery,
} from "../../../lib/types";
import Activation, { DISPLAY_ACTIVATION_FRAGMENT } from "./Activation";

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

export const MY_CURRENT_ACTIVATIONS_QUERY = gql`
  query MyCurrentActivations {
    myCurrentActivations {
      ...DisplayActivation
    }
  }

  ${DISPLAY_ACTIVATION_FRAGMENT}
`;

const CurrentActivations = () => {
  const { data } = useMyCurrentActivationsQuery();

  return (
    <Paper style={{ height: "100%" }}>
      <Box px={3} py={2}>
        <Box mb={2}>
          <Typography>Операции:</Typography>
        </Box>

        {data?.myCurrentActivations?.map((activation) => (
          <Activation key={activation.id} activation={activation} />
        ))}
      </Box>
    </Paper>
  );
};

export default CurrentActivations;
