import { Button } from "@material-ui/core"
import React from "react"

export type PaginationProps = {
  limit: number
  offset: number
  allCount: number
  onChangeOffset: (nextoffset: number) => void
}

const Pagination = ({
  allCount,
  limit,
  offset,
  onChangeOffset,
}: PaginationProps) => {
  const pagesCount = Math.ceil(allCount / limit)
  const currentPage = offset / limit
  const pages = Array(pagesCount).fill(0)

  return (
    <div style={{ display: "flex" }}>
      {pages.map((_, page) => (
        <Button
          color="primary"
          size="small"
          variant={currentPage === page ? "contained" : "outlined"}
          style={{
            minWidth: "30px",
            marginRight: "3px",
          }}
          onClick={() => onChangeOffset(page * limit)}
        >
          {page + 1}
        </Button>
      ))}
    </div>
  )
}

export default Pagination
