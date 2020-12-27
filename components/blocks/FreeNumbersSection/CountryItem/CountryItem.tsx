import React from "react"

import Typography from "../../../layout/Typography"
import { useTheme } from "../../../hooks/useTheme"

type Props = {
  image: string
  label: string
  selected: boolean
  code: number
  onSelectCountry: (code: number) => void
}

const CountryItem: React.FC<Props> = ({
  image,
  label,
  selected,
  onSelectCountry,
  code,
}) => {
  const theme = useTheme()
  return (
    <div className="country" onClick={() => onSelectCountry(code)}>
      <style jsx>{`
        .country {
          display: flex;
          align-items: center;
          color: #000;
          padding: 10px 20px;
        }

        .country img {
          width: 27px;
          margin-right: 10px;
        }

        .country__label {
          font-size: 16px;
          line-height: 19px;
          margin-right: 10px;
          font-weight: 400;
        }

        .country__code {
          font-size: 16px;
          line-height: 18.75px;
          color: #f74874;
        }
      `}</style>
      <style jsx>{`
        .country {
          background: ${selected ? "#e9e8f1" : "inherit"};
          cursor: ${selected ? "initial" : "pointer"};
        }
      `}</style>
      <img src={image} alt="flag" />{" "}
      <div className="country__label">{label}</div>
      <div className="country__code">{code ? `+${code}` : ""}</div>
    </div>
  )
}

export default CountryItem
