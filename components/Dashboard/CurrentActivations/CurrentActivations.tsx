import React from "react";
import { Box, makeStyles, Paper, Typography } from "@material-ui/core";
import { gql } from "@apollo/client";

import {
  ActivationStatus,
  ActivationType,
  useCancelActivationMutation,
  useMyCurrentActivationsQuery,
  useFinishActivationMutation,
} from "../../../lib/types";
import Activation, { DISPLAY_ACTIVATION_FRAGMENT } from "./Activation";

const mock: ActivationType[] = [
  {
    cost: 100,
    id: 1,
    expiresAt: new Date(new Date().getTime() + 1000 * 60 * 20).toISOString(),
    phoneNum: "+7 (908) 924-88-27",
    status: ActivationStatus.SmsRecieved,
    sourceActivationId: "12039810",
    serviceCode: "vk",
    activationCodes: [
      {
        activationId: 1,
        code: "23212424213",
        id: 10,
      },
    ],
  },
  {
    cost: 100,
    id: 2,
    expiresAt: new Date(new Date().getTime() + 1000 * 60 * 20).toISOString(),
    phoneNum: "+7 (908) 924-88-27",
    status: ActivationStatus.SmsRecieved,
    sourceActivationId: "12039810",
    serviceCode: "vk",
    activationCodes: [
      {
        activationId: 1,
        code: "23212424213",
        id: 10,
      },
    ],
  },
  {
    cost: 100,
    id: 2,
    expiresAt: new Date(new Date().getTime() + 1000 * 60 * 20).toISOString(),
    phoneNum: "+7 (908) 924-88-27",
    status: ActivationStatus.SmsRecieved,
    sourceActivationId: "12039810",
    serviceCode: "vk",
    activationCodes: [
      {
        activationId: 1,
        code: "23212424213",
        id: 10,
      },
    ],
  },
  {
    cost: 100,
    id: 2,
    expiresAt: new Date(new Date().getTime() + 1000 * 60 * 20).toISOString(),
    phoneNum: "+7 (908) 924-88-27",
    status: ActivationStatus.SmsRecieved,
    sourceActivationId: "12039810",
    serviceCode: "vk",
    activationCodes: [
      {
        activationId: 1,
        code: "23212424213",
        id: 10,
      },
    ],
  },
  {
    cost: 100,
    id: 2,
    expiresAt: new Date(new Date().getTime() + 1000 * 60 * 20).toISOString(),
    phoneNum: "+7 (908) 924-88-27",
    status: ActivationStatus.SmsRecieved,
    sourceActivationId: "12039810",
    serviceCode: "vk",
    activationCodes: [
      {
        activationId: 1,
        code: "23212424213",
        id: 10,
      },
    ],
  },
  {
    cost: 100,
    id: 2,
    expiresAt: new Date(new Date().getTime() + 1000 * 60 * 20).toISOString(),
    phoneNum: "+7 (908) 924-88-27",
    status: ActivationStatus.SmsRecieved,
    sourceActivationId: "12039810",
    serviceCode: "vk",
    activationCodes: [
      {
        activationId: 1,
        code: "23212424213",
        id: 10,
      },
    ],
  },
  {
    cost: 100,
    id: 2,
    expiresAt: new Date(new Date().getTime() + 1000 * 60 * 20).toISOString(),
    phoneNum: "+7 (908) 924-88-27",
    status: ActivationStatus.SmsRecieved,
    sourceActivationId: "12039810",
    serviceCode: "vk",
    activationCodes: [
      {
        activationId: 1,
        code: "23212424213",
        id: 10,
      },
    ],
  },
  {
    cost: 100,
    id: 2,
    expiresAt: new Date(new Date().getTime() + 1000 * 60 * 20).toISOString(),
    phoneNum: "+7 (908) 924-88-27",
    status: ActivationStatus.SmsRecieved,
    sourceActivationId: "12039810",
    serviceCode: "vk",
    activationCodes: [
      {
        activationId: 1,
        code: "23212424213",
        id: 10,
      },
    ],
  },
  {
    cost: 100,
    id: 2,
    expiresAt: new Date(new Date().getTime() + 1000 * 60 * 20).toISOString(),
    phoneNum: "+7 (908) 924-88-27",
    status: ActivationStatus.SmsRecieved,
    sourceActivationId: "12039810",
    serviceCode: "vk",
    activationCodes: [
      {
        activationId: 1,
        code: "23212424213",
        id: 10,
      },
    ],
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

export const CANCEL_ACTIVATION_MUTATION = gql`
  mutation CancelActivation($activationId: Int!) {
    cancelActivation(activationId: $activationId) {
      path
      message
    }
  }
`;

export const FINISH_ACTIVATION_MUTATION = gql`
  mutation FinishActivation($activationId: Int!) {
    finishActivation(activationId: $activationId) {
      path
      message
    }
  }
`;

type CurrentActivationsProps = {
  buyLoading: boolean;
};

const CurrentActivations = ({ buyLoading }: CurrentActivationsProps) => {
  const classes = useStyles();
  const { data, refetch } = useMyCurrentActivationsQuery({
    pollInterval: 3000,
  });
  const [cancelActivation] = useCancelActivationMutation();
  const [finishActivation] = useFinishActivationMutation();

  const onCancelActivation = (activationId: number) => {
    cancelActivation({ variables: { activationId } }).finally(() => refetch());
  };

  const onFinishActivation = (activationId: number) => {
    finishActivation({ variables: { activationId } }).finally(() => refetch());
  };

  React.useEffect(() => {
    if (!buyLoading) {
      refetch && refetch();
    }
  }, [buyLoading]);

  return (
    <Paper style={{ height: "100%" }}>
      <Box height="100%">
        <Box px={3} py={1} className={classes.header}>
          <Typography variant="body2">Операции:</Typography>
        </Box>

        <Box height="calc(100% - 35px)" overflow="auto" px={2} py={2}>
          {data?.myCurrentActivations?.map((activation) => (
            <Box key={activation.id} mb={2}>
              <Activation
                activation={activation}
                onCancel={onCancelActivation}
                onFinish={onFinishActivation}
              />
            </Box>
          ))}

          {!data?.myCurrentActivations?.length && (
            <Paper variant="outlined">
              <Box px={2} py={3}>
                <Typography>
                  Нет операций. Закажите номер и используйте его для регистрации
                  в выбранном сайте/приложении
                </Typography>
              </Box>
            </Paper>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default CurrentActivations;

const useStyles = makeStyles(() => ({
  header: {
    background: "#eee",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
  },
}));
