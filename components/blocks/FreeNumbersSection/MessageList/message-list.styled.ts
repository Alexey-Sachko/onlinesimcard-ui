import { styled } from "@material-ui/core/styles";
import CachedIconMatarial from "@material-ui/icons/Cached";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import IconButtonMaterial from "@material-ui/core/IconButton";

export const CachedIcon = styled(CachedIconMatarial)({
  color: "#383838",
});

export const MessageContainer = styled(Box)({
  background: "#fff",
  borderRadius: "5px",
  boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",
});

export const TypographySpacing = styled(Typography)({
  letterSpacing: "1.5px",
  whiteSpace: "nowrap",
});

export const ResetButton = styled(IconButtonMaterial)({
  marginTop: "-5px",
  marginLeft: "5px",
  border: "1px solid #757575",

  "&:hover": {
    boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",
  },
});
