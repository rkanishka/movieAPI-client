import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MovieView from '../movie-view/movie-view';
import MovieCard from '../movie-card/movie-card';
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

const MainView = () => {
  const storedToken = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  useEffect(() => {
    if (!token) {
      return;
  }
  fetch("https://moviedb-fdeb4b5f0aa4.herokuapp.com/movies", {
    headers: { Authorization: `Bearer ${token}` }
})
      .then((response) => response.json())
      .then((data) => {
        const moviesApi = data.map((movie) => ({
          id: movie.ID,
          title: movie.Title,
          description: movie.Description,
          genre: movie.Genre,
          director: movie.Director,
        }));
        setMovies(moviesApi);
      })
    }, [token]);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleBackClick = () => {
    setSelectedMovie(null);
  };

  if (selectedMovie) {
    let similarMovies = movies.filter(
      (movie) =>
        movie.title !== selectedMovie.title &&
        movie.genre === selectedMovie.genre
    );
    return (
      <>
        <MovieView movie={selectedMovie} onBackClick={handleBackClick} />
        <hr />
        {similarMovies.length > 0 && <h2>Similar movies</h2>}
        {similarMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={handleMovieClick}
          />
        ))}
      </>
    );
  }

  return (
    <div>
      {movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <div>
          <h1>Main View</h1>
          <div className="movie-list">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onMovieClick={handleMovieClick}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

MainView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      director: PropTypes.string.isRequired,
    })
  ),
                
};

export default MainView;
