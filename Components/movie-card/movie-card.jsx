
import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie, isFavorite, onFavoriteToggle }) => {
  const handleFavoriteToggle = () => {
    onFavoriteToggle(movie.id);
  };

  return (
    <Col md={4} className="mb-4">
      <Card>
        <Card.Img variant="top" src={movie.imagePath} alt={movie.title} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.description}</Card.Text>
          <Link to={`/movies/${movie.id}`}>
            <Button variant="primary" className="mr-2">
              View Details
            </Button>
          </Link>
          <Button
            variant={isFavorite ? 'danger' : 'outline-primary'}
            onClick={handleFavoriteToggle}
          >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </Button>
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
  isFavorite: PropTypes.bool.isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
};
export default MovieCard; 