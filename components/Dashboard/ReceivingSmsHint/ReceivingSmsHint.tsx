import React from "react";

const ReceivingSmsHint = () => {
  return (
    <>
      <style jsx>{`
        .hint-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #ffffff;
          border-radius: 6px;
          width: 100%;
          padding: 10px 20px;
        }

        .hint-sms {
          font-family: "Inter", sans-serif;
          color: #232628;
          font-weight: 500;
          font-size: 16px;
          font-weight: 120%;
        }
      `}</style>
      <div className="hint-container">
        <div>
          <div className="hint-sms">Приём СМС</div>
        </div>
      </div>
    </>
  );
};

export default ReceivingSmsHint;
