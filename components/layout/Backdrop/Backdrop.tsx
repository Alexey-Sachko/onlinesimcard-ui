import React, { CSSProperties } from "react";

type Props = {
  open?: boolean;
  style?: CSSProperties;
  onClick?: () => void;
};

const Backdrop: React.FC<Props> = ({ open, style, onClick }) => {
  return (
    <>
      <style jsx>{`
        .backdrop {
          opacity: 0;
          background: black;
          z-index: 11;
          position: fixed;
          width: 100%;
          height: 100%;
          transition: opacity ease-out 0.3s;
        }
      `}</style>
      <style jsx>{`
        .backdrop {
          display: ${open ? "block" : "none"};
          opacity: ${open ? 0.5 : 0};
        }
      `}</style>
      <div onClick={onClick} style={style} className="backdrop" />
    </>
  );
};

export default Backdrop;
