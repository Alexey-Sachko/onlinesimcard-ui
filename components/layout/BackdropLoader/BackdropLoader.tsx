import React from "react"

type Props = {
  open: boolean
}

const BackdropLoader: React.FC<Props> = ({ open }) => {
  return open ? (
    <div className="backdrop-loader">
      <style jsx>
        {`
          .backdrop-loader {
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            z-index: 11;
            background-color: rgba(255, 255, 255, 0.7);
            border-radius: 5px;
          }
        `}
      </style>
    </div>
  ) : null
}
export default BackdropLoader
