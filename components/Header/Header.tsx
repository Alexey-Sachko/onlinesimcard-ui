import React, { useEffect, useState } from "react";
import { SetUseState } from "../../types/setUseState";

import Logo from "../layout/Logo";

type HeaderProps = {
  secondaryAction?: React.ReactNode;
  dark?: boolean;
  fullWidth?: string;
  mobileHideLogo?: boolean;
  setOpenMenu?: SetUseState<boolean>;
};

const Header: React.FC<HeaderProps> = ({
  secondaryAction,
  fullWidth = "1200px",
  setOpenMenu,
  dark,
  mobileHideLogo,
}) => {
  const [isBlueHead, setIsBlueHead] = useState(false);

  useEffect(() => {
    const scrollHandler = () => {
      const scrollTop = document.documentElement.scrollTop;
      if (scrollTop > 0) {
        if (!isBlueHead) {
          setIsBlueHead(true);
        }
      } else {
        if (isBlueHead) {
          setIsBlueHead(false);
        }
      }
    };
    document.addEventListener("scroll", scrollHandler);
    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, [isBlueHead]);

  return (
    <>
      <style jsx>{`
        .header {
          position: sticky;
          border-bottom: 1px solid #e0e0e0;
          overflow-y: hidden;
          z-index: 11;
        }

        .header-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0 auto;
          min-height: 50px;
          max-width: ${fullWidth};
        }

        .header-left-section {
          width: 310px;
          min-width: 310px;
        }

        .humburger-menu {
          display: none;
        }

        .header-left-section {
          display: flex;
        }

        .header-right-section {
          display: flex;
          width: 100%;
        }

        @media (max-width: 1410px) {
          .header {
            padding: 0 20px;
            max-width: 100%;
          }

          .header-left-section {
            width: 260px;
            min-width: 260px;
          }
        }

        @media (max-width: 1100px) {
          .header-left-section {
            width: 60px;
            min-width: 60px;
          }
          .header-logo {
            ${mobileHideLogo ? "display: none;" : ""}
          }
          .humburger-menu {
            display: flex;
            cursor: pointer;
            align-items: center;
            width: 40px;
            transition: transform 0.2s ease-out;
          }
          .humburger-menu:hover {
            transform: scale(1.15);
          }
          .header {
            border-radius: 0;
          }
        }
      `}</style>

      <style jsx>{`
        .header {
          background: ${dark ? "#4b3c71" : "transparent"};
        }
      `}</style>
      <div className="header">
        <div className="header-inner">
          <div className="header-left-section">
            <div className="header-logo">
              <Logo
                iconUrl={dark ? "/static/LogoLight.svg" : "/static/Logo.svg"}
              />
            </div>

            <div
              className="humburger-menu"
              onClick={() => setOpenMenu((prevState) => !prevState)}
            >
              <img src="/static/Humberger.svg" alt="hamburger-menu" />
            </div>
          </div>

          <div className="header-right-section">{secondaryAction}</div>
        </div>
      </div>
    </>
  );
};

export default Header;
