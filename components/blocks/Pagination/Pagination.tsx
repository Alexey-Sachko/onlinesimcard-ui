import React from "react";
import { default as ReactPagination } from "react-js-pagination";

import { useTheme } from "../../hooks/useTheme";

type Props = {
  currentPage: number;
  totalCount: number;
  onChange: (page: number) => void;
};

const Pagination: React.FC<Props> = ({ currentPage, onChange, totalCount }) => {
  const theme = useTheme();
  return (
    <>
      <style jsx global>{`
        .wrapper .pagination li {
          padding: 10px 15px;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${theme.colors.blueBasic};
          cursor: pointer;
          background: ${theme.colors.whiteBasic};
          user-select: none;
          transition: background 0.2s ease;
        }

        .wrapper .pagination li.disabled:hover {
          background: ${theme.colors.whiteBasic};
        }
        .wrapper .pagination li:hover {
          background: #f0f0f0;
        }
        .wrapper .pagination li a {
          outline: none !important;
          font-size: 18px;
        }

        .wrapper .active {
          background: ${theme.colors.blueBasic} !important;
          color: ${theme.colors.whiteBasic} !important;
          border-radius: 5px;
        }
        .wrapper .pagination {
          display: flex;
          padding-left: 0;
        }
        ul.footable-pagination .pagination-arrow-reverse {
          transform: rotate(180deg);
        }
        ul.footable-pagination .pagination-arrow {
          width: 20px;
          user-select: none;
        }

        ul.footable-pagination .footable-page.disabled {
          opacity: 0.7;
          cursor: initial;
        }

        ul.footable-pagination .footable-page.disabled a {
          cursor: initial;
        }

        ul.footable-pagination .footable-page a {
          cursor: pointer;
          text-decoration: none;
          font-family: ${theme.fonts.bodyFontFamily};
          color: ${theme.colors.blueBasic};
        }

        ul.footable-pagination .footable-page:not(.active) a:active {
          color: ${theme.colors.blueBasic} !important;
        }

        ul.footable-pagination .footable-page.active a {
          color: ${theme.colors.whiteBasic};
          user-select: none;
        }

        @media (max-width: 1024px) {
          .wrapper .pagination {
            justify-content: center;
          }
        }
      `}</style>
      <ReactPagination
        activePage={currentPage}
        itemsCountPerPage={10}
        totalItemsCount={totalCount}
        pageRangeDisplayed={5}
        nextPageText={
          <img className="pagination-arrow" src="static/arrow-paginate.svg" />
        }
        prevPageText={
          <img
            className="pagination-arrow pagination-arrow-reverse"
            src="static/arrow-paginate.svg"
          />
        }
        innerClass="pagination pagination-split footable-pagination float-right"
        itemClass="footable-page"
        onChange={onChange}
        hideFirstLastPages
      />
    </>
  );
};

export default Pagination;
