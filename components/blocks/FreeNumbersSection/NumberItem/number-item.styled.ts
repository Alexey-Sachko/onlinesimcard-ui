import { styled } from "@material-ui/core/styles";
import CachedIconMatarial from "@material-ui/icons/Cached";
import Box from "@material-ui/core/Box";
import OpenInNewIconMaterial from "@material-ui/icons/OpenInNew";
import MessageIconMaterial from "@material-ui/icons/Message";
import Typography from "@material-ui/core/Typography";

type Props = {
  selected?: boolean;
};

export const MessageIcon = styled(MessageIconMaterial)(
  ({ selected }: Props) => ({
    color: selected ? "#1E71FF" : "#383838",
  })
);

export const Container = styled(Box)(({ selected }: Props) => ({
  padding: "20px",
  display: "flex",
  alignItems: "center",
  borderBottom: "1px solid #E0E0E0",
  background: selected ? "#E0E0E0" : "initial",
  cursor: selected ? "initial" : "pointer",

  "&:last-child": {
    borderBottom: "none",
  },
}));

export const OpenInNewIcon = styled(OpenInNewIconMaterial)(
  ({ selected }: Props) => ({
    color: selected ? "#1E71FF" : "#757575",
  })
);

export const Number = styled(Typography)(({ selected }: Props) => ({
  color: selected ? "#1E71FF" : "initial",
}));
