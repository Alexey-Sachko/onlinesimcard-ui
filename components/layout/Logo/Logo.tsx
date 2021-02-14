import React from "react";
import Link from "next/link";

export type LogoProps = {
  iconUrl: string;
};

const Logo = ({ iconUrl }: LogoProps) => {
  return (
    <>
      <style jsx>{`
        .logo-img {
          width: 120px;
          min-width: 120px;
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
          <img className="logo-img" src={iconUrl} alt="VirtualNUM" />
        </a>
      </Link>
    </>
  );
};

export default Logo;
