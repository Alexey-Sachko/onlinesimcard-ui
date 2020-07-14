import React, { useState } from "react";
import { useDispatch } from "react-redux";
import NextLink from "next/link";
import { Formik, Form, Field, FieldProps } from "formik";
// import Avatar from "@material-ui/core/Avatar";
// import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
// import Grid from "@material-ui/core/Grid";
// import Box from "@material-ui/core/Box";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
// import Link from "@material-ui/core/Link";
// import { makeStyles } from "@material-ui/core/styles";
// import Container from "@material-ui/core/Container";
import * as Yup from "yup";
// import clsx from "clsx";

import Typography from "../components/layout/Typography";
import Copyright from "../components/blocks/Copyright";
import Header from "../components/blocks/Header";
import { useTypedSelector } from "../redux";
import { signupUser } from "../redux/features/user/index";

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
//   avatarSuccess: {
//     backgroundColor: theme.palette.success.main,
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
  repassword: string;
};

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Некорректный Email").required("Поле обязательное"),
  password: Yup.string()
    .required("Поле обязательное")
    .min(8, "Пароль должен быть не менее 8 символов")
    .max(20, "Пароль должен быть не более 20 символов"),

  // .matches(/[a-zA-Z]/, "Пароль должен включать в себя латинские буквы"),
  repassword: Yup.string()
    // .required("Пароли должны совпадать")
    .test("passwords-match", "Пароли должны совпадать", function (value) {
      return this.parent.password === value;
    }),
});

export default function SignUp() {
  const dispatch = useDispatch();
  // const classes = useStyles();
  const { error, loading, done } = useTypedSelector((s) => s.user.signup);

  const submitHandler = async ({ email, password }: Values) => {
    dispatch(signupUser({ email, password }));
  };

  return (
    // <>
    //   <Header blueBg />
    //   <Container component="main" maxWidth="xs">
    //     <div className={classes.paper}>
    //       <Avatar
    //         className={clsx(classes.avatar, {
    //           [classes.avatarSuccess]: done,
    //         })}
    //       >
    //         {done ? <DoneOutlineIcon /> : <LockOutlinedIcon />}
    //       </Avatar>
    //       <Typography component="h1" variant="h5">
    //         {done ? "Вы зарегистрированы" : "Регистрация"}
    //       </Typography>
    //       {done && (
    //         <Box mt={4}>
    //           <Typography variant="h6" className={classes.successMessage}>
    //             На вашу почту отправлено письмо для подтвержения.
    //           </Typography>
    //           <Box mt={3}>
    //             <Link href="/" component={NextLink}>
    //               <a style={{ textDecoration: "none" }}>
    //                 <Button color="primary" fullWidth variant="contained">
    //                   Хорошо
    //                 </Button>
    //               </a>
    //             </Link>
    //           </Box>
    //         </Box>
    //       )}
    //       {error}
    //       {!done && (
    //         <Formik
    //           initialValues={{ email: "", password: "", repassword: "" }}
    //           validationSchema={SignupSchema}
    //           validateOnChange={false}
    //           validateOnBlur={false}
    //           onSubmit={submitHandler}
    //         >
    //           {({ errors }) => (
    //             <Form className={classes.form} noValidate>
    //               <Grid container spacing={2}>
    //                 <Grid item xs={12}>
    //                   <Field name="email">
    //                     {({ field }: FieldProps) => {
    //                       return (
    //                         <TextField
    //                           variant="outlined"
    //                           required
    //                           fullWidth
    //                           label="Email Адрес"
    //                           autoComplete="email"
    //                           autoFocus
    //                           error={Boolean(errors.email)}
    //                           helperText={errors.email}
    //                           {...field}
    //                         />
    //                       );
    //                     }}
    //                   </Field>
    //                 </Grid>
    //                 <Grid item xs={12}>
    //                   <Field name="password">
    //                     {({ field }: FieldProps) => (
    //                       <TextField
    //                         variant="outlined"
    //                         required
    //                         fullWidth
    //                         label="Пароль"
    //                         type="password"
    //                         autoComplete="current-password"
    //                         error={Boolean(errors.password)}
    //                         helperText={errors.password}
    //                         {...field}
    //                       />
    //                     )}
    //                   </Field>
    //                 </Grid>
    //                 <Grid item xs={12}>
    //                   <Field name="repassword">
    //                     {({ field }: FieldProps) => (
    //                       <TextField
    //                         variant="outlined"
    //                         required
    //                         fullWidth
    //                         label="Повторите Пароль"
    //                         type="password"
    //                         error={Boolean(errors.repassword)}
    //                         helperText={errors.repassword}
    //                         {...field}
    //                       />
    //                     )}
    //                   </Field>
    //                 </Grid>
    //               </Grid>
    //               <Button
    //                 type="submit"
    //                 fullWidth
    //                 variant="contained"
    //                 color="primary"
    //                 className={classes.submit}
    //               >
    //                 Зарегистрироваться
    //               </Button>
    //               <Grid container justify="flex-end">
    //                 <Grid item>
    //                   <NextLink href="/signin">
    //                     <a>Уже зарегистрированы? Войти</a>
    //                   </NextLink>
    //                 </Grid>
    //               </Grid>
    //             </Form>
    //           )}
    //         </Formik>
    //       )}
    //     </div>
    //     <Box mt={5}>
    //       <Copyright />
    //     </Box>
    //   </Container>
    // </>
    null
  );
}
