import React from "react";

import CustomContainer from "../CustomContainer";
import Typography from "../../layout/Typography";
import { theme } from "../../../theme/customTheme";

type Props = {
  show: boolean;
};

const Notifier: React.FC<Props> = ({ show }) => {
  return (
    <div className="container">
      <style jsx>{`
        .container {
          display: flex;
          position: sticky;
          bottom: 0;
          background: ${theme.colors.greenBasic};
          opacity: ${!show ? 0.8 : 0};
          justify-content: center;
        }
        .notify-message {
          padding: 10px 0;
        }
      `}</style>
      <CustomContainer>
        <div className="notify-message">
          <Typography
            letterSpacing="0"
            fontWeight="bold"
            wordSpacing="2px"
            variant="usualParagraph"
            color="jetBasic"
          >
            НОМЕР СКОПИРОВАН
          </Typography>
        </div>
      </CustomContainer>
    </div>
  );
};

export default Notifier;
