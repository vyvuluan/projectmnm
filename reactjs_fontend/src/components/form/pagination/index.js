import React from "react";

const Pagination = (props) => {
  const { totalPage, handlePerPage, currentPage } = props;
  // console.log(currentPage);
  const perPage = (e) => {
    // console.log(e.target.id);
    e.target.id
      ? handlePerPage(e.target.id)
      : handlePerPage(e.target.innerText);
  };
  return (
    <div className="position-relative mt-2 " style={{ marginBottom: "30px" }}>
      <nav
        aria-label="Page navigation example "
        className="position-absolute top-50 start-50 translate-middle"
      >
        <ul className="pagination">
          <li
            className="page-item"
            {...(currentPage === 1 ? { style: { display: "none" } } : null)}
          >
            <a
              style={{ listStyleType: "none", border: "0" }}
              className="page-link"
              href="#"
              aria-label="Previous"
              onClick={perPage}
              id={1}
            >
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
              <a
                style={{ listStyleType: "none", border: "0", boxShadow: "0" }}
                className="page-link shadow-none"
                href="#"
                {...(currentPage === page
                  ? {
                      style: {
                        color: "white",
                        backgroundColor: "#d70018",
                        listStyleType: "none",
                        border: "0",
                      },
                    }
                  : null)}
              >
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
            <a
              style={{ listStyleType: "none", border: "0" }}
              className="page-link"
              href="#"
              aria-label="Next"
              onClick={perPage}
              id={totalPage.length}
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Pagination;
