import React from "react";

const CustomContainer: React.FC = ({ children }) => {
  return (
    <div className="custom-container">
      <style jsx>{`
        .custom-container {
          margin: 0 230px;
        }
        @media (max-width: 1024px) {
          .custom-container {
            margin: 0 30px;
          }
        }
      `}</style>
      {children}
    </div>
  );
};

export default CustomContainer;
