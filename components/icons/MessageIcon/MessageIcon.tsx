import React from "react";

import { theme } from "../../../theme/customTheme";

type Props = {
  color: keyof typeof theme["colors"];
};

const MessageIcon: React.FC<Props> = ({ color }) => {
  return (
    <svg
      width="31"
      height="31"
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.1668 0.916687H3.83342C2.22925 0.916687 0.931331 2.22919 0.931331 3.83335L0.916748 30.0834L6.75008 24.25H27.1668C28.7709 24.25 30.0834 22.9375 30.0834 21.3334V3.83335C30.0834 2.22919 28.7709 0.916687 27.1668 0.916687ZM24.2501 18.4167H6.75008V15.5H24.2501V18.4167ZM24.2501 14.0417H6.75008V11.125H24.2501V14.0417ZM24.2501 9.66669H6.75008V6.75002H24.2501V9.66669Z"
        fill={theme.colors[color]}
      />
    </svg>
  );
};

export default MessageIcon;
