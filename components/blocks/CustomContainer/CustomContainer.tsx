import { CSSProperties } from "@material-ui/core/styles/withStyles"
import React from "react"

type Props = {
  style?: CSSProperties
  width?: string
  margin?: string
}

const CustomContainer: React.FC<Props> = ({
  children,
  style,
  width = "1380px",
  margin = "0 30px",
}) => {
  return (
    <div className="custom-container" style={style}>
      <style jsx>{`
        .custom-container {
          width: ${width};
          margin: 0 auto;
        }
        @media (max-width: 1440px) {
          .custom-container {
            margin: ${margin ? margin : "0 30px"};
            width: auto;
          }
        }

        @media (max-width: 576px) {
          .custom-container {
            margin: ${margin ? "0 15px" : "0 0"};
          }
        }
      `}</style>
      {children}
    </div>
  )
}

export default CustomContainer
