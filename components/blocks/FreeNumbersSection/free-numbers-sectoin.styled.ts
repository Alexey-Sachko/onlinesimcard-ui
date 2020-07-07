import Box from "@material-ui/core/Box";
import PaginationMaterial from "@material-ui/lab/Pagination";
import { styled } from "@material-ui/core/styles";

export const Wrapper = styled(Box)({
  background: "#EBF2FF",
});

export const CountryContainer = styled(Box)({
  borderRadius: "5px",
  background: "#fff",
  boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",
});

export const Pagination = styled(PaginationMaterial)({
  marginLeft: "-14px",

  "& button": {
    borderRadius: "5px",
    height: "36px",
    fontSize: "18px",
    color: "#525252",
  },

  "& .Mui-selected": {
    background: "#1E71FF",
    color: "#fff",

    "&:hover": {
      background: "#1E71FF",
    },
  },
});
