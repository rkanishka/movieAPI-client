import React, { useState, useEffect } from 'react';
import MovieView from '../movie-view/movie-view';
import MovieCard from '../movie-card/movie-card';
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { CarouselView } from "../carousel-view/carousel-view";
import { Row, Col, Button, Spinner } from "react-bootstrap";
import { BoxArrowRight } from "react-bootstrap-icons";

const MainView = () => {
  const storedToken = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  useEffect(() => {
    if (token) {
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
        });
    }
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
    <Row className="text-light justify-content-md-center">
      {!user ? (
        <>
          <Col md={8}>
            <h3>Login</h3>
            <LoginView onLoggedIn={(user, token) => { setUser(user); setToken(token) }} />
            <h3>account not found?</h3>
            <SignupView />
          </Col>
        </>
      ) : (
        <>
          <Col>
            <Button variant="outline-light"
              onClick={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
              }}><BoxArrowRight /></Button>
          </Col>
          <CarouselView movies={movies} />
          {movies.map((movie) => (
            <Col className="mb-3 mt-3" key={movie.id} md={3}>
              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(movie);
                }} />
            </Col>
          ))}
        </>
      )}
    </Row>
  );
};

export default MainView;