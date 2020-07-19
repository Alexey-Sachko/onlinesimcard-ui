import React, { useEffect, useState } from "react";

import CustomContainer from "../CustomContainer";
import Typography from "../../layout/Typography";
import { useTheme } from "../../hooks/useTheme";

type Props = {
  reset: boolean;
};
let timeout;

const delayNotifier = 3000;

const Notifier: React.FC<Props> = ({ reset }) => {
  const theme = useTheme();
  const [show, setShow] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (!firstRender) {
      window.clearTimeout(timeout);
      setShow(true);
      timeout = setTimeout(() => {
        setShow(false);
      }, delayNotifier);
    } else {
      setFirstRender(false);
    }
  }, [reset]);

  return (
    <div className="container">
      <style jsx>{`
        .container {
          display: flex;
          position: sticky;
          bottom: 0;
          background: ${theme.colors.greenBasic};
          opacity: ${show ? 0.8 : 0};
          justify-content: center;
        }
        .notify-message {
          padding: 10px 0;
          text-align: center;
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
