import React from "react";

import Header from "../../Header/Header";
import Typography from "../../layout/Typography";
import { Footer } from "../../MainPage/sections/Footer";

const Forbidden = () => {
  return (
    <>
      <Header fullWidth="1380px" />
      <div>
        <div>
          <Typography variant="h1" align="center">
            403
          </Typography>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Forbidden;

// const useStyles = makeStyles(() => ({
//   container: {
//     minHeight: "100vh",
//     display: "flex",
//     flexDirection: "column",
//   },
//   content: {
//     flexGrow: 1,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingTop: "80px",
//   },
//   footer: {
//     // flexGrow: 1,
//   },
// }));
