import { styled } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

export const LeftSide = styled(Grid)(({ theme }) => ({
  width: "250px",
  height: "100vh",
  boxShadow: theme.shadows[1],
}));

export const RightSide = styled(Grid)({
  flexGrow: 1,
  height: "100vh",
  overflowY: "auto",
});
