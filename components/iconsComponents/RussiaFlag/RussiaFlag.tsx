import React from "react";

const RussiaFlag = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 38.4375H100V60.3125H0V38.4375Z" fill="#1B75BB" />
      <path
        d="M84.375 15H15.625C5.27031 15 0 22.6953 0 32.1875V38.4375H100V32.1875C100 22.6953 94.7297 15 84.375 15Z"
        fill="#E6E7E8"
      />
      <path
        d="M0 66.5625C0 76.0547 5.27031 83.75 15.625 83.75H84.375C94.7297 83.75 100 76.0547 100 66.5625V60.3125H0V66.5625Z"
        fill="#EC1C24"
      />
      <rect
        x="0.5"
        y="15.5"
        width="99"
        height="68.44"
        rx="14.5"
        stroke="#999999"
      />
    </svg>
  );
};

export default RussiaFlag;
