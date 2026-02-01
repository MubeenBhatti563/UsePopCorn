import React, { useEffect } from "react";
import Star from "./Star";

const MovieDetail = ({
  hover,
  setHover,
  rating,
  setRating,
  handleAddClick,
  movieDetail,
  countRef,
}) => {
  useEffect(() => {
    if (rating) countRef.current = countRef.current + 1;
  }, [rating]);

  return (
    <div className="watched-bottom">
      <div className="rating-div">
        <div className="rating-add">
          <div className="rating-stars">
            <span className="stars">
              {Array.from({ length: 10 }, (_, i) => (
                <Star
                  key={i}
                  i={i}
                  rating={rating}
                  hover={hover}
                  onRate={setRating}
                  onHover={setHover}
                />
              ))}
            </span>
            <span className="star-items">{rating > 0 ? rating : hover}</span>
          </div>
          <button className="add-btn" onClick={handleAddClick}>
            + Add to list
          </button>
        </div>
        <div className="about-story">
          <p className="movie-plot">{movieDetail.Plot}</p>
          <p className="movie-actors">Starring {movieDetail.Actors}</p>
          <p className="movie-director">Directed by {movieDetail.Director}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
