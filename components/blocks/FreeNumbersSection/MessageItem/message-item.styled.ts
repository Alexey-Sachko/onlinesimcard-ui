import { styled } from "@material-ui/core/styles";
import CachedIconMatarial from "@material-ui/icons/Cached";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

export const Container = styled(Box)({
  padding: "20px",
  borderBottom: "1px solid #e0e0e0",

  "&:last-child": {
    borderBottom: "none",
  },
});

export const Pin = styled(Box)({
  width: "6px",
  height: "6px",
  borderRadius: "50%",
  background: "#85B1FF",
  marginTop: "auto",
  marginBottom: "auto",
  marginRight: "15px",
  // marginLeft: "15px",
});

export const DataHumans = styled(Typography)({
  color: "#757575",
  marginTop: "auto",
});

export const TextBody = styled(Typography)({
  color: "#525252",
});
