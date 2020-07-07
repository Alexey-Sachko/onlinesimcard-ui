import Box from "@material-ui/core/Box";
import { styled } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

type Props = {
  selected?: boolean;
};

export const Container = styled(Box)(({ selected }: Props) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  padding: "20px 55px",
  textAlign: "center",
  background: selected ? "#85B1FF" : "#fff",
  cursor: selected ? "initial" : "pointer",
  borderRight: "1px solid #EBF2FF",
  transition: "background .15s ease",

  "&:last-child": {
    border: "none",
    borderRadius: "0 5px 5px 0",
  },

  "&:first-child": {
    borderRadius: "5px 0 0 5px",
  },

  "&:hover": {
    background: selected ? "#85B1FF" : "#f0f0f0",
  },

  "& img": {
    width: "50px",
  },
}));

export const Title = styled(Typography)(({ selected }: Props) => ({
  color: selected ? "#FFFFFF" : "#757575",
}));
