import React from "react";

import Header from "../../Header/Header";
import Footer from "../Footer";
import Typography from "../../layout/Typography";

const Forbidden = () => {
  return (
    <>
      <Header />
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
