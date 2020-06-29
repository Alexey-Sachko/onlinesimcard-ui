import Box from "@material-ui/core/Box";
import { styled } from "@material-ui/core/styles";

export const Title = styled("h1")({
  fontSize: "48px",
  marginBottom: "40px",
  color: "#383838",
});

export const Description = styled("div")({
  fontSize: "24px",
  lineHeight: "36px",
  color: "#383838",
});

export const RightCapture = styled(Box)({
  width: "100%",
  height: "100%",
  background: "url(/static/bg-main-section.jpg) center no-repeat",
});
