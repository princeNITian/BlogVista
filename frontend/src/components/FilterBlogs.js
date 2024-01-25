// frontend/src/components/FilterBlogs.js
import React, { useState } from "react";

const FilterBlogs = ({ onFilter }) => {
  const [tagFilter, setTagFilter] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [publicationDate, setPublicationDate] = useState("");

  const handleFilter = () => {
    onFilter({
      tagFilter: tagFilter.trim(),
      minRating,
      publicationDate,
    });
  };

  return (
    <div className="container mt-5">
      <h2>Filter Blogs</h2>
      <div className="row">
        <div className="col-md-3 mb-3">
          <label htmlFor="tagFilter" className="form-label">
            Filter by Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tagFilter"
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
          />
        </div>
        <div className="col-md-3 mb-3">
          <label htmlFor="minRating" className="form-label">
            Minimum Rating
          </label>
          <input
            type="number"
            className="form-control"
            id="minRating"
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            min="0"
            max="5"
          />
        </div>
        <div className="col-md-3 mb-3">
          <label htmlFor="publicationDate" className="form-label">
            Publication Date
          </label>
          <input
            type="date"
            className="form-control"
            id="publicationDate"
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
          />
        </div>
        <div className="col-md-3 mb-3" style={{ marginTop: "32px" }}>
          <button
            className="btn btn-outline-secondary btn-block"
            onClick={handleFilter}
          >
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBlogs;
