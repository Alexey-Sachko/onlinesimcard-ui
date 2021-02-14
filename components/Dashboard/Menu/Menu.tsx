import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

import { SetUseState } from "../../../types/setUseState";
import MenuItem from "./MenuItem";

type Props = { setOpenMenu?: SetUseState<boolean> };

const Menu: React.FC<Props> = ({ setOpenMenu }) => {
  const [innerHeight, setInnerHeight] = useState(0);
  const { logout } = useAuth();

  const history = useHistory();

  const navigate = (to: string) => () => {
    history.push(to);
    setOpenMenu(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setInnerHeight(window.innerHeight - 70);
    }
  }, []);

  return (
    <>
      <style jsx>{`
        .menu-container {
          width: 270px;
          height: 100%;
          overflow-y: auto;
          padding: 20px 15px 76px 15px;
          font-size: 13px;
          background: #ffffff;
          border-radius: 6px;
          transition: all ease 0.3s;
        }

        .menu__title {
          color: #f74874;
          margin-bottom: 10px;
          margin-top: 30px;
          padding-left: 20px;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-weight: bold;
          font-family: "Inter", sans-serif;
        }

        @media (max-width: 1410px) {
          .menu-container {
            width: 220px;
          }
        }

        @media (max-width: 1100px) {
          .menu-container {
            overflow-y: auto;
            border-radius: 0 6px 6px 0;
          }
        }

        @media (max-width: 460px) {
          .menu__title {
            margin-top: 30px;
            margin-bottom: 20px;
          }
        }
      `}</style>

      <div className="menu-container">
        <MenuItem>
          <Link href="/">Главная</Link>
        </MenuItem>
        <MenuItem onClick={navigate("/")}>Приём СМС</MenuItem>
        <MenuItem onClick={navigate("/history")}>История</MenuItem>

        {/* <div className="menu__title">Аккаунт</div> */}

        <MenuItem onClick={logout}>Выход</MenuItem>
      </div>
    </>
  );
};

export default Menu;
