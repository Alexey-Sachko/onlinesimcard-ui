import React from "react";

type MenuItemProps = {
  onClick?: () => void;
  children: React.ReactNode;
};

const MenuItem = React.memo<MenuItemProps>(({ onClick, children }) => {
  return (
    <>
      <div className="menu__item" onClick={onClick}>
        {children}
      </div>

      <style jsx>
        {`
          .menu__item {
            padding: 10px 15px;
            cursor: pointer;
            transition: 0.2s ease-out background-color;
            border-radius: 6px;
            font-family: "Inter", sans-serif;
            color: #232628;
            font-weight: 400;
          }

          .menu__item:hover {
            background: #eae7f2;
          }
        `}
      </style>
    </>
  );
});

MenuItem.displayName = "MenuItem";

export default MenuItem;
