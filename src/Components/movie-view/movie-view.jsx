import React from 'react';

const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <h2>{movie.Title}</h2>
      <img src="https://via.placeholder.com/150" alt={movie.Title} />
      <p>{movie.Description}</p>
      <p>Genre: {movie.Genre}</p>
      <p>Director: {movie.Director}</p>
      <button onClick={onBackClick}>Back to Main View</button>
    </div>
  );
};

export default MovieView;