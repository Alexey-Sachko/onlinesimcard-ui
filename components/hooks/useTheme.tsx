import React from "react";

import ThemeContext from "../../theme/ThemeContext";
import { themeBasic } from "../../theme/customTheme";

export const useTheme = () => React.useContext(ThemeContext);
export { themeBasic };
