
import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Col } from 'react-bootstrap';

const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Col md={4} className="mb-4">
      <Card onClick={() => onMovieClick(movie)}>
        <Card.Img variant="top" src={movie.imagePath} alt={movie.title} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.description}</Card.Text>
          <Button variant="primary">View Details</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};

export default MovieCard;
