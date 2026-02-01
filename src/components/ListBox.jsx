import React, { useState } from "react";

const ListBox = ({ movies, isLoading, error, handleCheck }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button onClick={() => setIsOpen(!isOpen)} className="btn-toggle">
        {isOpen ? "−" : "+"}
      </button>
      {isOpen && (
        <ul className="list">
          {isLoading && <p className="loading">Loading...</p>}
          {error && <p className="error">{error}</p>}
          {!isLoading && !error && movies.length === 0 && (
            <p className="empty-state">Start searching for movies...</p>
          )}
          {!isLoading &&
            !error &&
            movies.map((item) => (
              <li
                onClick={() => handleCheck(item.imdbID)}
                key={item.imdbID}
                className="list-item"
              >
                <img
                  src={
                    item.Poster !== "N/A"
                      ? item.Poster
                      : "https://via.placeholder.com/50x75?text=No+Image"
                  }
                  alt={item.Title}
                  className="movie-img"
                />
                <div>
                  <h3>{item.Title}</h3>
                  <p>📅 {item.Year}</p>
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default ListBox;
