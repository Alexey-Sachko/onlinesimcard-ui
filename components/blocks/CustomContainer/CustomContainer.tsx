import React from "react";

const CustomContainer: React.FC = ({ children }) => {
  return (
    <div className="custom-container">
      <style jsx>{`
        .custom-container {
          width: 1380px;
          margin: 0 auto;
        }
        @media (max-width: 1440px) {
          .custom-container {
            margin: 0 30px;
            width: 100%;
          }
        }

        @media (max-width: 576px) {
          .custom-container {
            margin: 0 15px;
          }
        }
      `}</style>
      {children}
    </div>
  );
};

export default CustomContainer;
