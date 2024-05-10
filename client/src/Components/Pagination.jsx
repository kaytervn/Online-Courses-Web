const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const handlePageClick = async (page, event) => {
    event.preventDefault();
    await onPageChange(page);
  };

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="d-flex justify-content-center">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <a
            className="page-link"
            href="#"
            onClick={(event) => handlePageClick(currentPage - 1, event)}
          >
            Previous
          </a>
        </li>
        {pages.map((page) => (
          <li
            key={page}
            className={`page-item ${currentPage === page ? "active" : ""}`}
            aria-current={currentPage === page ? "page" : null}
          >
            <a
              className="page-link"
              href="#"
              onClick={(event) => handlePageClick(page, event)}
            >
              {page}
            </a>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <a
            className="page-link"
            href="#"
            onClick={(event) => handlePageClick(currentPage + 1, event)}
          >
            Next
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
