import React, { useState } from "react";
import Star from "./Star";
import MovieDetail from "./MovieDetail";

const ListWatched = ({
  watched,
  isWatchedList,
  setIsWatchedList,
  movieDetail,
  isLoading,
  handleAddWatched,
  handleDelMovie,
  countRef,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleAddClick = () => {
    if (rating === 0) {
      alert("Please rate the movie before adding!");
      return;
    }
    handleAddWatched(movieDetail, rating);
    setRating(0);
  };

  const avgImdbRating =
    watched.length > 0
      ? (
          watched.reduce((acc, movie) => acc + movie.imdbRating, 0) /
          watched.length
        ).toFixed(1)
      : 0;

  const avgUserRating =
    watched.length > 0
      ? (
          watched.reduce((acc, movie) => acc + movie.userRating, 0) /
          watched.length
        ).toFixed(1)
      : 0;

  const avgRuntime =
    watched.length > 0
      ? Math.round(
          watched.reduce((acc, movie) => acc + movie.runtime, 0) /
            watched.length,
        )
      : 0;

  return (
    <div className="box" style={{ padding: !isWatchedList ? "0" : "1.5em" }}>
      <div className="btn-handle">
        {isWatchedList && (
          <button onClick={() => setIsOpen(!isOpen)} className="btn-toggle">
            {isOpen ? "−" : "+"}
          </button>
        )}
        {!isWatchedList && (
          <button
            onClick={() => setIsWatchedList(!isWatchedList)}
            className="btn-toggle"
            style={{ margin: isWatchedList ? "0" : "0.4em 0.2em" }}
          >
            ⬅
          </button>
        )}
      </div>
      {isOpen && (
        <>
          {isWatchedList ? (
            <div>
              <div className="summary">
                <h2>Movies You Watched</h2>
                <div className="summary-stats">
                  <p>
                    🎬 <span>{watched.length}</span> movies
                  </p>
                  <p>
                    ⭐️ <span>{avgImdbRating}</span>
                  </p>
                  <p>
                    🌟 <span>{avgUserRating}</span>
                  </p>
                  <p>
                    ⏳ <span>{avgRuntime}</span> min
                  </p>
                </div>
              </div>
              <ul className="list">
                {watched.length === 0 ? (
                  <p className="empty-state">No watched movies yet...</p>
                ) : (
                  watched.map((movie) => (
                    <li key={movie.imdbID} className="list-item">
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="movie-img"
                      />
                      <div>
                        <h3>{movie.title}</h3>
                        <div className="movie-stats">
                          <p>⭐️ {movie.imdbRating}</p>
                          <p>🌟 {movie.userRating}</p>
                          <p>⏳ {movie.runtime} min</p>
                        </div>
                      </div>
                      <button
                        className="close-btn"
                        onClick={() => handleDelMovie(movie.imdbID)}
                      >
                        x
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </div>
          ) : (
            <div className="clicked-item">
              {!isLoading ? (
                <div className="watched-top">
                  <div className="top-side-img">
                    <img src={movieDetail.Poster} alt="" />
                  </div>
                  <div className="top-side-data">
                    <div className="data-div">
                      <h2 className="watched-head">{movieDetail.Title}</h2>
                      <p className="date">
                        {movieDetail.Released} &bull; {movieDetail.Runtime}
                      </p>
                      <p className="type">{movieDetail.Genre}</p>
                      <p className="imgd-rate">
                        ⭐ {movieDetail.imdbRating} IMDb rating
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="loading">Loading...</p>
              )}
              <MovieDetail
                hover={hover}
                setHover={setHover}
                rating={rating}
                setRating={setRating}
                handleAddClick={handleAddClick}
                movieDetail={movieDetail}
                countRef={countRef}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ListWatched;
