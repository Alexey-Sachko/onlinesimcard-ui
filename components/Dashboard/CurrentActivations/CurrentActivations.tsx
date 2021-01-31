import React from "react";
import {
  Box,
  createStyles,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { gql } from "@apollo/client";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Link } from "react-router-dom";

import {
  ActivationStatus,
  ActivationType,
  useCancelActivationMutation,
  useMyActivationsQuery,
  useFinishActivationMutation,
} from "../../../lib/types";
import Activation, { DISPLAY_ACTIVATION_FRAGMENT } from "./Activation";
import Pagination from "./Pagination";

const mock: ActivationType[] = [
  {
    cost: 100,
    id: 1,
    expiresAt: new Date(new Date().getTime() + 1000 * 60 * 20).toISOString(),
    phoneNum: "+7 (908) 924-88-27",
    status: ActivationStatus.SmsRecieved,
    sourceActivationId: "12039810",
    serviceCode: "vk",
    countryCode: "0",
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
    countryCode: "1",
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
    countryCode: "0",
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
    countryCode: "0",
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
    countryCode: "0",
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
    countryCode: "0",
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
    countryCode: "0",
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
  query MyActivations($pagination: PaginationGqlInput!) {
    myActivationsCount(isCurrent: true)
    myActivations(pagination: $pagination, isCurrent: true) {
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

const ACTIVATIONS_PERPAGE = 10;
const pollInterval = 4000;

const STORAGE_ALERT_POSSIBILITY_INFO_KEY = "POSSIBILITY_INFO_V1";

const CurrentActivations = ({ buyLoading }: CurrentActivationsProps) => {
  const classes = useStyles();
  const [showAlert, setShowAlert] = React.useState(true);
  const [offset, setOffset] = React.useState(0);
  const limit = ACTIVATIONS_PERPAGE;
  const { data, refetch, startPolling } = useMyActivationsQuery({
    variables: { pagination: { limit, offset } },
    pollInterval,
    onError: () => startPolling(pollInterval),
    onCompleted: () => startPolling(pollInterval),
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

  React.useEffect(() => {
    const raw = localStorage.getItem(STORAGE_ALERT_POSSIBILITY_INFO_KEY);
    try {
      const value = JSON.parse(raw);
      if (value === false) {
        setShowAlert(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const closeAlert = () => {
    setShowAlert(false);
    localStorage.setItem(
      STORAGE_ALERT_POSSIBILITY_INFO_KEY,
      JSON.stringify(false)
    );
  };

  return (
    <Paper style={{ height: "100%" }}>
      <Box height="100%">
        <Box px={3} py={1} className={classes.header}>
          <Typography variant="body2">Операции:</Typography>
          <Link to="/history">История</Link>
        </Box>

        <Box height="calc(100% - 35px)" overflow="auto" px={2} py={2}>
          {showAlert && (
            <Box mb={2}>
              <Alert severity="info" onClose={closeAlert}>
                <AlertTitle>
                  Вк и некоторые другие сервисы не отправляют первое СМС!!!
                </AlertTitle>
                <Typography variant="body2">Высылайте код повторно</Typography>
              </Alert>
            </Box>
          )}

          {data?.myActivations?.map((activation) => (
            <Box key={activation.id} mb={2}>
              <Activation
                activation={activation}
                onCancel={onCancelActivation}
                onFinish={onFinishActivation}
              />
            </Box>
          ))}

          {!data?.myActivations?.length && (
            <Alert severity="warning">
              Нет операций. Закажите номер и используйте его для регистрации в
              выбранном сайте/приложении
            </Alert>
          )}

          {data?.myActivationsCount > limit && (
            <Pagination
              onChangeOffset={setOffset}
              limit={limit}
              offset={offset}
              allCount={data.myActivationsCount}
            />
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default CurrentActivations;

const useStyles = makeStyles(() =>
  createStyles({
    header: {
      display: "flex",
      justifyContent: "space-between",
      background: "#eee",
      borderTopLeftRadius: "5px",
      borderTopRightRadius: "5px",
    },
  })
);
