import React from "react";

const Pagination = (props) => {
  const { totalPage, handlePerPage, currentPage } = props;
  // console.log(totalPage);
  const perPage = (e) => {
    // console.log(e.target.innerText);
    handlePerPage(e.target.innerText);
  };
  return (
    <div className="position-relative m-4 p-4 ">
      <nav
        aria-label="Page navigation example "
        className="position-absolute top-50 start-50 translate-middle"
      >
        <ul className="pagination ">
          <li
            className="page-item"
            {...(currentPage === 1 ? { style: { display: "none" } } : null)}
          >
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {totalPage.map((page, index) => (
            <li
              key={index}
              value={page}
              className="page-item"
              onClick={perPage}
            >
              <a className="page-link" href="#">
                {page}
              </a>
            </li>
          ))}

          <li
            className="page-item"
            {...(currentPage === totalPage.length || totalPage.length === 0
              ? { style: { display: "none" } }
              : null)}
          >
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Pagination;
