import React from "react";

import { useTheme, themeBasic } from "../../hooks/useTheme";

type Props = {
  color: keyof typeof themeBasic["colors"];
};

const CopyIcon: React.FC<Props> = ({ color }) => {
  const theme = useTheme();
  return (
    <svg
      width="30"
      height="31"
      viewBox="0 0 30 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.75 24.25H6.25V6.75H15V4.25H6.25C4.8625 4.25 3.75 5.375 3.75 6.75V24.25C3.75 25.625 4.8625 26.75 6.25 26.75H23.75C25.125 26.75 26.25 25.625 26.25 24.25V15.5H23.75V24.25ZM17.5 4.25V6.75H21.9875L9.7 19.0375L11.4625 20.8L23.75 8.5125V13H26.25V4.25H17.5Z"
        fill={theme.colors[color]}
      />
    </svg>
  );
};

export default CopyIcon;
