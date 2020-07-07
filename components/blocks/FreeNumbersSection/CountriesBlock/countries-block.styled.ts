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
  paddingBottom: "25px",
  height: "148px",
  width: "268px",
  textAlign: "center",
  background: selected ? "#85B1FF" : "#fff",
  cursor: selected ? "initial" : "pointer",
  borderRight: "1px solid #EBF2FF",

  "&:last-child": {
    border: "none",
  },

  "&:hover": {
    background: selected ? "#85B1FF" : "#f0f0f0",
  },
}));

export const Title = styled(Typography)(({ selected }: Props) => ({
  color: selected ? "#FFFFFF" : "#757575",
}));
