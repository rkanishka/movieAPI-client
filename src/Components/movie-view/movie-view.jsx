import React from 'react';
import PropTypes from 'prop-types';

const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <img src={movie.imagePath} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>
      <p>Year: {movie.year}</p>
      <p>Genre: {movie.genre.name}</p>
      <p>Director: {movie.director}</p>
      <p>Actors: {movie.actors.join(', ')}</p>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    director: PropTypes.string.isRequired,
    actors: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
export default MovieView;