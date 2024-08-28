import PropTypes from "prop-types";

const Pagination = ({ postsPerPage, length }) => {
  const paginationNumbers = [];

  for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {
    paginationNumbers.push(i);
  }

  return (
    <div className="pagination">
      {paginationNumbers.map((pageNumber) => (
        <button key={pageNumber}>{pageNumber}</button>
      ))}
    </div>
  );
};

Pagination.propTypes = {
  postsPerPage: PropTypes.string.isRequired,
  length: PropTypes.number,
};

export default Pagination;
