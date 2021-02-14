import React from "react";
import { Menu, MenuItem } from "@material-ui/core";

export type UserMenuProps = {
  displayName: string | undefined;
  onExit: () => void | Promise<void>;
};

const UserMenu = ({ displayName, onExit }: UserMenuProps) => {
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
      <style jsx>{`
        .avatar {
          width: 24px;
          height: 24px;
        }

        .username {
          display: flex;
          align-items: center;
          cursor: pointer;
          color: #ffffff;
          font-size: 14px;
          font-family: "Inter", sans-serif;
          font-weight: bold;
          line-height: 120%;
        }

        .username__text {
          min-width: 300px;
          max-width: 300px;
          margin-right: 10px;
          text-align: right;
        }
      `}</style>
      <div className="username" onClick={handleClick}>
        <div className="username__text">{displayName}</div>
        <div className="avatar">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="18" cy="18" r="18" fill="white" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.125 26.2501C11.125 26.2501 9.75 26.2501 9.75 24.8751C9.75 23.5001 11.125 19.3751 18 19.3751C24.875 19.3751 26.25 23.5001 26.25 24.8751C26.25 26.2501 24.875 26.2501 24.875 26.2501H11.125ZM18 18.0001C19.094 18.0001 20.1432 17.5655 20.9168 16.7919C21.6904 16.0183 22.125 14.9691 22.125 13.8751C22.125 12.7811 21.6904 11.7319 20.9168 10.9583C20.1432 10.1847 19.094 9.7501 18 9.7501C16.906 9.7501 15.8568 10.1847 15.0832 10.9583C14.3096 11.7319 13.875 12.7811 13.875 13.8751C13.875 14.9691 14.3096 16.0183 15.0832 16.7919C15.8568 17.5655 16.906 18.0001 18 18.0001Z"
              fill="#4B3C71"
            />
          </svg>
        </div>
      </div>

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
        getContentAnchorEl={null} //https://github.com/mui-org/material-ui/issues/7961
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
