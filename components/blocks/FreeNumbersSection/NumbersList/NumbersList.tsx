import React from "react"

import NumberItem from "../NumberItem"
import { useTheme } from "../../../hooks/useTheme"
import { Numbers } from "../types"

type Props = {
  data: Record<string, Numbers>
  onSelectNumber: (number: string | number) => void
  selectedNumber: number | string
  setIsShowNotify: SetUseState<boolean>
}

export type SetUseState<T> = (value: T | ((prevVal: T) => T)) => void

const NumbersList: React.FC<Props> = ({
  data,
  onSelectNumber,
  selectedNumber,
  setIsShowNotify,
}) => {
  const theme = useTheme()

  const numbersData = Object.entries(data)
  return (
    <>
      <style jsx>
        {`
          .reset-button-img {
            width: 100%;
          }
          .numbers-list-title {
            display: flex;
            margin-left: 20px;
          }
          .numbers-list-title span {
            letter-spacing: 1.5px;
            white-space: nowrap;
          }
          .reset-button-container {
            margin-left: 15px;
          }
          .numbers-container {
            margin-top: 10px;
          }
        `}
      </style>

      <div className="numbers-container">
        {numbersData?.map(([pureNumber, numberData], idx) => (
          <NumberItem
            key={idx}
            onSelectNumber={onSelectNumber}
            full_number={numberData.full_number}
            number={pureNumber}
            country={numberData.country}
            selected={selectedNumber === pureNumber}
            setIsShowNotify={setIsShowNotify}
          />
        ))}
      </div>
    </>
  )
}

export default NumbersList
