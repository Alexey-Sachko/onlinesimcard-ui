import React from "react";
import Link from "@material-ui/core/Link";

import Typography from "../../layout/Typography";

export default function Copyright() {
  return (
    <Typography variant="usualParagraph" color="jetBasic" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://onlinesimcard.ru/">
        Online simcard
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
