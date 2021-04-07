import React, { useState } from "react";
import { gql } from "@apollo/client";
import {
  Box,
  Container,
  Grid,
  Hidden,
  LinearProgress,
  makeStyles,
  Tab,
  Tabs,
} from "@material-ui/core";
import PublicIcon from "@material-ui/icons/Public";
import MessageIcon from "@material-ui/icons/Message";
import { useSnackbar } from "notistack";

import { useAuth } from "../../../hooks/useAuth";
import { useCreateActivationMutation } from "../../../lib/types";
import { formatErrors } from "../../../utils/formatErrors";
import Countries from "../Countries";
import CurrentActivations from "../CurrentActivations";
import Services from "../Services";
import { LoadingMap, OnBuyParams } from "../Services";
import { TabIndex } from "./tab-index.enum";
import ReceivingSmsHint from "../ReceivingSmsHint";

export const CREATE_ACTIVATION_MUTATION = gql`
  mutation CreateActivation($createActivationInput: CreateActivationInput!) {
    createActivation(createActivationInput: $createActivationInput) {
      path
      message
    }
  }
`;

const Activations: React.FC = () => {
  const tabsClasses = useTabsStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { auth, loading } = useAuth();
  const [
    createActivation,
    { loading: createActivationLoading, error },
  ] = useCreateActivationMutation();
  const [countryCode, setCountryCode] = useState("0");
  const [tabIndex, setTabIndex] = useState(TabIndex.Services);
  const [loadingMap, setLoadingMap] = useState<LoadingMap>({});

  const setLoading = (serviceCode: string, value: boolean) => {
    setLoadingMap((prev) => {
      if (prev[serviceCode] === value) {
        return prev;
      }

      const next = { ...prev };
      if (!value) {
        delete next[serviceCode];
      } else {
        next[serviceCode] = true;
      }

      return next;
    });
  };

  const onBuyHandler = async (params: OnBuyParams) => {
    if (!createActivationLoading) {
      setLoading(params.serviceCode, true);
      const res = await createActivation({
        variables: {
          createActivationInput: {
            countryCode,
            serviceCode: params.serviceCode,
          },
        },
      });

      setLoading(params.serviceCode, false);

      const errors = res.data?.createActivation;

      if (errors) {
        const parsedErrors = formatErrors(errors);
        if (parsedErrors?.balanceAmount) {
          enqueueSnackbar(parsedErrors.balanceAmount, { variant: "warning" });
        } else if (parsedErrors?.NO_NUMBERS) {
          enqueueSnackbar(
            "Для данного сервиса уже купили все номера, попробуйте позже",
            {
              variant: "warning",
            }
          );
        } else {
          enqueueSnackbar("Произошла ошибка", { variant: "error" });
        }
      } else if (res.errors) {
        enqueueSnackbar("Произошла ошибка", { variant: "error" });
      } else {
        enqueueSnackbar("Номер заказан", { variant: "success" });
        window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
        setTabIndex(TabIndex.Activations);
      }
    }
  };

  return (
    <>
      <style jsx>{`
        .tab {
          padding: 0;
          min-height: 0px;
        }
        .reveiving-sms-container {
          display: grid;
          width: 100%;
          height: 100%;
          grid-gap: 15px;
          grid-template-areas:
            "hint hint hint"
            "services activations activations"
            "services activations activations";
          max-height: calc(100vh - 50px);
          grid-template-columns: 320px 1fr 1fr;
          grid-template-rows: 40px 0.5fr 0.5fr;
          padding-bottom: 5px;
        }
        .hint {
          grid-area: hint;
        }

        .services {
          grid-area: services;
          display: flex;
          flex-direction: column;
        }
        .current-activations {
          grid-area: activations;
        }
        .hidden-xl {
          display: none;
        }
        .countries {
          margin-bottom: 10px;
        }

        @media (max-width: 1140px) {
          .reveiving-sms-container {
            grid-gap: 10px;
          }
        }

        @media (max-width: 760px) {
          .hidden-sm {
            display: none;
          }
          .hidden-xl {
            display: flex;
            flex-direction: column;
          }

          .reveiving-sms-container {
            grid-template-areas:
              "hint hint hint"
              "services services services"
              "services services services";
          }

          .current-activations {
            height: calc(100% - 70px);
            overflow: auto;
          }
        }
      `}</style>
      <style jsx>{`
        @media (max-width: 760px) {
          .reveiving-sms-container {
            grid-template-areas: ${tabIndex === TabIndex.Services
              ? `
              "services services services"
              "services services services"`
              : ` 
              "activations activations activations"
              "activations activations activations"`};
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 75px 1fr;
          }
          .hint {
            display: none;
          }
        }
      `}</style>
      {loading && !auth && <LinearProgress />}
      <div className="reveiving-sms-container hidden-sm">
        <div className="hint">
          <ReceivingSmsHint />
        </div>

        <div className="services">
          <div className="countries">
            <Countries
              countryCode={countryCode}
              setCountryCode={setCountryCode}
            />
          </div>
          <Services
            countryCode={countryCode}
            onBuy={onBuyHandler}
            loadingMap={loadingMap}
          />
        </div>
        <div className="current-activations">
          <CurrentActivations buyLoading={createActivationLoading} />
        </div>
      </div>
      <div className="hidden-xl" style={{ height: "100%" }}>
        <Tabs
          classes={tabsClasses}
          value={tabIndex}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          centered
          onChange={(_, value) => setTabIndex(value)}
          aria-label="disabled tabs example"
        >
          <Tab
            className="tab"
            label={
              <Box display="flex" alignItems="center">
                <PublicIcon />{" "}
                <span style={{ marginLeft: "7px" }}>Сервисы</span>
              </Box>
            }
          />
          <Tab
            className="tab"
            label={
              <Box display="flex" alignItems="center">
                <MessageIcon />{" "}
                <span style={{ marginLeft: "7px" }}>Операции</span>
              </Box>
            }
          />
        </Tabs>
        <Box mt={2} height="calc(100% - 55px)">
          {tabIndex === TabIndex.Services && (
            <div className="reveiving-sms-container">
              <div className="hint">
                <ReceivingSmsHint />
              </div>

              <div className="services">
                <div className="countries">
                  <Countries
                    countryCode={countryCode}
                    setCountryCode={setCountryCode}
                  />
                </div>
                <Services
                  countryCode={countryCode}
                  onBuy={onBuyHandler}
                  loadingMap={loadingMap}
                />
              </div>
            </div>
          )}

          {tabIndex === TabIndex.Activations && (
            <div className="current-activations">
              <CurrentActivations buyLoading={createActivationLoading} />
            </div>
          )}
        </Box>
      </div>
    </>
  );
};

export default Activations;

const useTabsStyles = makeStyles(() => ({
  root: {
    minHeight: "30px",
  },
}));
