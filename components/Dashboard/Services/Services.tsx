import React from "react";
import {
  Box,
  Button,
  Chip,
  createSvgIcon,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import ShopIcon from "@material-ui/icons/Shop";
import { Twitter as TwitterIcon } from "@material-ui/icons";

const mockData = [
  { name: "Vkontakte", id: 1, price: 25, code: "vk" },
  { name: "Ok", id: 2, price: 10, code: "ok" },
  { name: "facebook", id: 3, price: 5, code: "fb" },
  { name: "twitter", id: 4, price: 3, code: "tw" },
  { name: "google", id: 5, price: 10, code: "gl" },
];

const VkIcon = createSvgIcon(
  <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2m3.08 14.27h-1.46c-.55 0-.72-.45-1.69-1.44c-.88-.83-1.26-.95-1.47-.95c-.29 0-.38.08-.38.5v1.31c0 .35-.11.57-1.04.57c-1.54 0-3.25-.94-4.45-2.67c-1.81-2.54-2.3-4.46-2.3-4.84c0-.21.07-.41.49-.41h1.47c.37 0 .51.16.65.56c.72 2.1 1.92 3.9 2.41 3.9c.19 0 .27-.09.27-.55V10.1c-.05-.98-.58-1.07-.58-1.42c0-.18.14-.34.37-.34h2.29c.31 0 .42.16.42.54v2.89c0 .31.13.42.23.42c.18 0 .34-.11.67-.45c1.05-1.17 1.8-2.98 1.8-2.98c.1-.21.26-.41.65-.41h1.43c.44 0 .54.23.44.54c-.18.85-1.96 3.36-1.94 3.36c-.16.25-.22.36 0 .65c.15.21.66.65 1 1.04c.62.71 1.1 1.3 1.23 1.71c.11.41-.09.62-.51.62z" />,
  "VkIcon"
);

const OkIcon = createSvgIcon(
  <path d="M17.83 12.74c-.28-.57-1.07-1.05-2.12-.24c-1.43 1.14-3.71 1.14-3.71 1.14s-2.28 0-3.71-1.14c-1.05-.81-1.84-.33-2.12.24c-.5 1 .06 1.49 1.33 2.3c1.09.7 2.58.96 3.54 1.06l-.8.8C9.1 18.03 8 19.12 7.25 19.88c-.45.46-.45 1.19 0 1.62l.14.16c.45.45 1.19.45 1.64 0L12 18.68c1.15 1.13 2.24 2.22 3 2.98c.45.45 1.18.45 1.64 0l.13-.16c.46-.43.46-1.16 0-1.62l-2.98-2.98l-.79-.81c.95-.09 2.42-.36 3.5-1.05c1.27-.81 1.83-1.3 1.33-2.3M12 4.57c1.38 0 2.5 1.12 2.5 2.49c0 1.38-1.12 2.49-2.5 2.49S9.5 8.44 9.5 7.06c0-1.37 1.12-2.49 2.5-2.49m0 7.55c2.8 0 5.06-2.26 5.06-5.06a5.06 5.06 0 1 0-10.12 0c0 2.8 2.26 5.06 5.06 5.06z" />,
  "OkIcon"
);

const GoogleIcon = createSvgIcon(
  <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27c3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10c5.35 0 9.25-3.67 9.25-9.09c0-1.15-.15-1.81-.15-1.81z" />,
  "GoogleIcon"
);

const icons = {
  vk: VkIcon,
  ok: OkIcon,
  fb: FacebookIcon,
  tw: TwitterIcon,
  gl: GoogleIcon,
};

const Services = () => {
  return (
    <Box>
      <Box px={3} py={1}>
        <Typography>Сервисы</Typography>
      </Box>

      <Paper>
        <List dense>
          {mockData.map(({ id, name, price, code }, idx) => {
            const Icon = icons[code];

            return (
              <ListItem divider={idx < mockData.length - 1} key={id}>
                <ListItemIcon>
                  <Icon color="primary" />
                </ListItemIcon>
                <ListItemText>{name}</ListItemText>
                <ListItemSecondaryAction>
                  <Box width="50px" display="inline-block">
                    <Chip
                      size="small"
                      variant="outlined"
                      label={<>{price}р.</>}
                    />
                  </Box>
                  <Tooltip title="Купить">
                    <IconButton size="small">
                      <ShopIcon />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </Paper>
    </Box>
  );
};

export default Services;
