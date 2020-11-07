import React from "react";
import { Avatar, Box, makeStyles, Menu, MenuItem } from "@material-ui/core";

export type UserMenuProps = {
  displayName: string | undefined;
  onExit: () => void | Promise<void>;
};

const UserMenu = ({ displayName, onExit }: UserMenuProps) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExit = () => {
    handleClose();
    onExit();
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        style={{ cursor: "pointer" }}
        onClick={handleClick}
      >
        <Avatar className={classes.avatar}>
          <svg
            className="MuiSvgIcon-root MuiAvatar-fallback"
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
          </svg>
        </Avatar>
        {displayName}
      </Box>

      <Menu
        id="balance-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MenuItem onClick={handleExit}>Выйти</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: "5px",
  },
}));
