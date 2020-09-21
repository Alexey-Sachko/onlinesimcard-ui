import React, { useCallback } from "react";
// import NextLink from "next/link";
import { Formik, Form, Field, FieldProps } from "formik";
// import Avatar from "@material-ui/core/Avatar";
// import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
// import Grid from "@material-ui/core/Grid";
// import Box from "@material-ui/core/Box";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// import { makeStyles } from "@material-ui/core/styles";
// import Container from "@material-ui/core/Container";
// import Link from "@material-ui/core/Link";

import Typography from "../components/layout/Typography";
import Copyright from "../components/blocks/Copyright";
import Header from "../components/blocks/Header";
import { gql } from "@apollo/client";
import { useLoginMutation } from "../lib/types";
import { formatErrors } from "../utils/formatErrors";
import CustomContainer from "../components/layout/CustomContainer";
import FormLogin from "../components/blocks/FormLogin";
import { useTheme } from "../components/hooks/useTheme";
import Button from "../components/controls/Button";
import Footer from "../components/blocks/Footer";

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(12),
//     [theme.breakpoints.up("md")]: {
//       marginTop: theme.spacing(20),
//     },
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: "100%", // Fix IE 11 issue.
//     marginTop: theme.spacing(3),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
//   successMessage: {
//     width: "100%",
//     textAlign: "center",
//   },
// }));

type Values = {
  email: string;
  password: string;
};

export const LOGIN_MUTATION = gql`
  mutation Login($authCredentialsDto: AuthCredentialsDto!) {
    login(authCredentialsDto: $authCredentialsDto) {
      path
      message
    }
  }
`;

export default function SigninPage() {
  const theme = useTheme();

  const onLoginGoogle = useCallback(() => {
    console.log("login google");
  }, []);
  const onLoginVk = useCallback(() => {
    console.log("login vk");
  }, []);
  const onCreateAccount = useCallback(() => {
    console.log("create account");
  }, []);

  return (
    <>
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 0.3fr 1fr;
          margin-top: 130px;
        }

        .form-title {
        }
        .form-subtitle {
          margin-top: 20px;
        }
        .login-form-container {
          margin-top: 100px;
        }
        .remember-password {
          margin-top: 50px;
          cursor: pointer;
        }
        .remember-password-text {
          text-decoration: underline;
        }
        .separator-login {
          background: ${theme.colors.jetExtraLight};
          width: 1px;
          height: 100%;
          margin: 0 auto 0;
        }
        .login-social-network {
          display: flex;
          flex-direction: column;
        }
        .social-network-title {
          margin-bottom: 50px;
        }
        .login-google {
          margin-bottom: 30px;
        }
        .create-account {
          margin-top: auto;
        }
        .create-account-title {
          margin-bottom: 20px;
        }
        .create-account-description {
          margin-bottom: 50px;
        }
        .button-icon-vk,
        .button-icon-google-plus {
          margin-right: 45px;
          margin-left: 40px;
        }

        @media (max-width: 1440px) {
          .container {
            grid-template-columns: 1fr 0.3fr 1fr;
          }
        }

        @media (max-width: 1200px) {
          .container {
            grid-template-columns: 1fr 0.2fr 1fr;
          }
          .button-icon-vk,
          .button-icon-google-plus {
            margin-right: 30px;
            margin-left: 25px;
          }
        }

        @media (max-width: 1024px) {
          .button-icon-vk,
          .button-icon-google-plus {
            width: 30px;
          }
        }

        @media (max-width: 768px) {
          .login-form {
            grid-area: a;
            margin-top: 80px;
          }
          .login-social-network {
            grid-area: b;
          }
          .container {
            margin-top: 45px;
            grid-template-columns: 1fr;
            grid-template-areas:
              "b"
              "a";
          }

          .separator-login {
            display: none;
          }

          .create-account {
            margin-top: 50px;
          }
          .button-icon-vk,
          .button-icon-google-plus {
            margin-right: 25px;
          }
        }
      `}</style>
      <Header />
      <CustomContainer>
        <div className="container">
          <div className="login-form">
            <div className="form-title">
              <Typography variant="h2" color="jetBasic">
                Уже есть аккаунт?
              </Typography>
            </div>
            <div className="form-subtitle">
              <Typography variant="bigParagraph" color="jetLight">
                Если у вас уже есть аккаунт, войдите по форме снизу
              </Typography>
            </div>
            <div className="login-form-container">
              <FormLogin />
              <div className="remember-password">
                <Typography variant="usualParagraph" color="blueBasic">
                  <span className="remember-password-text">Забыли пароль?</span>
                </Typography>
              </div>
            </div>
          </div>
          <div className="separator-login"></div>
          <div className="login-social-network">
            <div className="social-network-title">
              <Typography variant="h3" color="jetBasic">
                Войти через социальные сети
              </Typography>
            </div>
            <div className="login-google">
              <Button
                text="Войти с помощью Google"
                icon={
                  <img
                    src="static/google-plus.svg"
                    className="button-icon-google-plus"
                    alt="button-icon"
                  />
                }
                color="cinnabarBasic"
                hoverColor="cinnabarHover"
                onClick={onLoginGoogle}
                justify="flex-start"
              />
            </div>
            <div>
              <Button
                text="Войти с помощью Вконтакте"
                icon={
                  <img
                    src="static/vk.svg"
                    className="button-icon-vk"
                    alt="button-icon"
                  />
                }
                color="steelBlueBasic"
                hoverColor="steelBlueHover"
                onClick={onLoginVk}
                justify="flex-start"
              />
            </div>

            <div className="create-account">
              <div className="create-account-title">
                <Typography variant="h3" color="jetBasic">
                  Создать аккаунт
                </Typography>
              </div>

              <div className="create-account-description">
                <Typography variant="bigParagraph" color="jetLight">
                  Если у вас еще нет аккаунта, мы можете его создать прямо
                  сейчас
                </Typography>
              </div>

              <Button
                color="mangoBasic"
                hoverColor="mangoBasic"
                onClick={onCreateAccount}
                outline
                text="Создать аккаунт"
              />
            </div>
          </div>
        </div>
      </CustomContainer>
    </>
  );
}
