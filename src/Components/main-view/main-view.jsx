import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import MovieView from '../movie-view/movie-view';
import MovieCard from '../movie-card/movie-card';
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { CarouselView } from "../carousel-view/carousel-view";
import { Row, Col, Button } from "react-bootstrap";
import { BoxArrowRight } from "react-bootstrap-icons";
import NavBar from "./Components/NavBar";
import { ProfileView } from "../profile-view/profile-view";
const MainView = () => {
  const storedToken = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");
  const [movies, setMovies] = useState([]);
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

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };
  const handleUpdateUser = (updatedUser) => {
    
    console.log('Update user:', updatedUser);
  };

  const handleDeregister = () => {
   
    console.log('Deregister user');
  };


  return (
    <Router>
       <NavBar user={user} onLogout={handleLogout} />
      <Switch>
        <Route exact path="/">
          {!user ? (
            <Row className="text-light justify-content-md-center">
              <Col md={8}>
                <h3>Login</h3>
                <LoginView onLoggedIn={(user, token) => { setUser(user); setToken(token) }} />
                <h3>account not found?</h3>
                <SignupView />
              </Col>
            </Row>
          ) : (
            <Redirect to="/movies" />
          )}
        </Route>

        <Route path="/movies">
          {user ? (
            <>
              <Row>
                <Col>
                  <Button variant="outline-light" onClick={handleLogout}>
                    <BoxArrowRight />
                  </Button>
                </Col>
              </Row>
              <CarouselView movies={movies} />
              <Row className="text-light justify-content-md-center">
                {movies.map((movie) => (
                  <Col className="mb-3 mt-3" key={movie.id} md={3}>
                    <Link to={`/movies/${movie.id}`}>
                      <MovieCard movie={movie} />
                    </Link>
                  </Col>
                ))}
              </Row>
            </>
          ) : (
            <Redirect to="/" />
          )}
        </Route>

        <Route path="/movies/:movieId">
          {user ? (
            <MovieView movies={movies} />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route path="/profile">
          {user ? (
            <ProfileView
              user={user}
              token={token}
              onLogout={handleLogout}
              onUpdateUser={handleUpdateUser}
              onDeregister={handleDeregister}
            />
          ) : (
            <Redirect to="/" />
          )}
        </Route>

      </Switch>
    </Router>
  );
};

export default MainView;