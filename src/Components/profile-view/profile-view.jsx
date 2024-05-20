import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import MovieCard from './MovieCard';

const ProfileView = ({ user, token, onLogout, onUpdateUser, onDeregister }) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);
  const [favoriteMovies, setFavoriteMovies] = useState(user.FavoriteMovies);

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedUser = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };
    onUpdateUser(updatedUser);
  };

  const handleDeregister = () => {
    onDeregister();
  };

  const handleFavoriteMovie = (movieId) => {
    if (favoriteMovies.includes(movieId)) {
      setFavoriteMovies(favoriteMovies.filter((id) => id !== movieId));
    } else {
      setFavoriteMovies([...favoriteMovies, movieId]);
    }
  };

  useEffect(() => {
    fetch(`https://moviedb-fdeb4b5f0aa4.herokuapp.com/users/${user.Username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((userData) => {
        setUsername(userData.Username);
        setEmail(userData.Email);
        setBirthday(userData.Birthday);
        setFavoriteMovies(userData.FavoriteMovies);
      })
      .catch((error) => console.error(error));
  }, [user.Username, token]);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>Profile</Card.Title>
              <Form onSubmit={handleUpdate}>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBirthday">
                  <Form.Label>Birthday</Form.Label>
                  <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Update
                </Button>
              </Form>
              <Button variant="danger" onClick={handleDeregister}>
                Deregister
              </Button>
            </Card.Body>
          </Card>

          <Card className="mt-4">
            <Card.Body>
              <Card.Title>Favorite Movies</Card.Title>
              <Row>
                {favoriteMovies.map((movieId) => (
                  <Col key={movieId} md={4} className="mb-3">
                    <MovieCard
                      movieId={movieId}
                      isFavorite={true}
                      onFavoriteToggle={handleFavoriteMovie}
                    />
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileView;