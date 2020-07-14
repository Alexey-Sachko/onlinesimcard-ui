import React from "react";
import Link from "next/link";

const Logo = () => {
  return (
    <>
      <style jsx>{`
        .logo-img {
          max-height: 25px;
        }
        .link {
          text-decoration: none;
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
