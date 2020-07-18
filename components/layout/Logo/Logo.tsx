import React from "react";
import Link from "next/link";

const Logo = () => {
  return (
    <>
      <style jsx>{`
        .logo-img {
          max-height: 35px;
        }
        .link {
          text-decoration: none;
        }

        @media (max-width: 768px) {
          .logo-img {
            max-height: 30px;
          }
        }
      `}</style>
      <Link href="/">
        <a className="link">
          <img
            className="logo-img"
            src="/static/logo.png"
            alt="OnlineSIMCARD"
          />
        </a>
      </Link>
    </>
  );
};

export default Logo;
