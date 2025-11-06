import React from "react";
import PropTypes from "prop-types";
import '../styles/memberDetails.css';

const Pagination = ({ membersPerPage, totalMembers, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalMembers / membersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li
          className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
          onClick={() => currentPage > 1 && paginate(currentPage - 1)}
        >
          <button className="page-link">Previous</button>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          </li>
        ))}
        <li
          className={`page-item ${currentPage === pageNumbers.length ? "disabled" : ""
            }`}
          onClick={() =>
            currentPage < pageNumbers.length && paginate(currentPage + 1)
          }
        >
          <button className="page-link">Next</button>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  membersPerPage: PropTypes.number.isRequired,
  totalMembers: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
};

export default Pagination;
