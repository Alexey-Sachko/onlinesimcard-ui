import { makeStyles } from "@material-ui/core";

export const useRegisterFormStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorCheckbox: {
    color: theme.palette.error.main,
  },
}));
