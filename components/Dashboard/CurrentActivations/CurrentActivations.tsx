import React from "react";
import { createStyles, makeStyles } from "@material-ui/core";
import { gql } from "@apollo/client";

import {
  useCancelActivationMutation,
  useMyActivationsQuery,
  useFinishActivationMutation,
  useCountriesQuery,
} from "../../../lib/types";
import Activation, { DISPLAY_ACTIVATION_FRAGMENT } from "./Activation";
import Pagination from "./Pagination";

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

const pollInterval = 4000;

const STORAGE_ALERT_POSSIBILITY_INFO_KEY = "POSSIBILITY_INFO";

const CurrentActivations = ({ buyLoading }: CurrentActivationsProps) => {
  const [showAlert, setShowAlert] = React.useState(true);
  const [offset, setOffset] = React.useState(0);
  const limit = ACTIVATIONS_PERPAGE;
  const { data, refetch, startPolling } = useMyActivationsQuery({
    variables: { pagination: { limit, offset } },
    pollInterval,
    onError: () => startPolling(pollInterval),
    onCompleted: () => startPolling(pollInterval),
  });
  const { data: countriesData } = useCountriesQuery({
    fetchPolicy: "cache-first",
  });
  const [cancelActivation] = useCancelActivationMutation();
  const [finishActivation] = useFinishActivationMutation();

  const onCancelActivation = (activationId: number) => {
    cancelActivation({ variables: { activationId } }).finally(() =>
      refetch?.()
    );
  };

  const onFinishActivation = (activationId: number) => {
    finishActivation({ variables: { activationId } }).finally(() =>
      refetch?.()
    );
  };

  React.useEffect(() => {
    if (!buyLoading) {
      refetch && refetch?.();
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

  // const closeAlert = () => {
  //   setShowAlert(false);
  //   localStorage.setItem(
  //     STORAGE_ALERT_POSSIBILITY_INFO_KEY,
  //     JSON.stringify(false)
  //   );
  // };

  return (
    <>
      <div className="operations-container">
        <div className="operations-title">Операции:</div>

        <div className="operations-items-container">
          {!data?.myActivations?.length && (
            <div className="operations-alert">
              Нет операций. Закажите номер и используйте его для регистрации в
              выбранном сайте/приложении
            </div>
          )}

          {data?.myActivations?.map((activation) => (
            <div className="activation-list-container" key={activation.id}>
              <Activation
                activation={activation}
                onCancel={onCancelActivation}
                onFinish={onFinishActivation}
                countries={countriesData?.countries}
              />
            </div>
          ))}

          {data?.myActivationsCount > limit && (
            <Pagination
              onChangeOffset={setOffset}
              limit={limit}
              offset={offset}
              allCount={data.myActivationsCount}
            />
          )}
        </div>
      </div>
      <style jsx>{`
        .operations-container {
        }
        .operations-items-container {
          max-height: calc(100vh - 150px);
          overflow-y: auto;
        }
        .activation-list-container:not(:last-child) {
          margin-bottom: 20px;
        }
        .operations-title {
          color: #232628;
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
          margin-bottom: 10px;
          font-family: "Inter", sans-serif;
        }
        .operations-alert {
          padding: 10px 20px;
          box-shadow: 0px 4px 6px rgba(99, 99, 99, 0.25);
          border-radius: 3px;
          background: #ffffff;
          border-left: 3px solid #f74874;
          margin-bottom: 30px;
          font-family: "Inter", sans-serif;
        }

        .show-alert {
          background: #ffffff;
          box-shadow: 0px 0px 20px rgba(59, 47, 89, 0.25);
          border-radius: 6px;
          padding: 15px 20px;
          font-family: "Inter", sans-serif;
        }

        @media (max-width: 1410px) {
          .operations-items-container {
            overflow-y: auto;
            margin-right: 0;
            padding-right: 0;
          }
        }

        @media (max-width: 760px) {
          .operations-title {
            display: none;
          }

          .operations-items-container {
            max-height: calc(100vh - 135px);
          }
        }
      `}</style>
    </>
  );
};

export default CurrentActivations;

const ACTIVATIONS_PERPAGE = 10;
