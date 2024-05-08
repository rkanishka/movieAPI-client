import React, { useState } from 'react';
import MovieCard from './MovieCard';
import MovieView from './MovieView';

const MainView = () => {
  const [movies, setMovies] = useState([
    {
      ID: 1,
      Title: 'Piku',
      Description:
        'Piku Banerjee (Deepika Padukone) is an architect residing in Chittaranjan Park, Delhi with her 70-year-old widower father, Bhashkor (Amitabh Bachchan). Bhashkor is a hypochondriac with chronic constipation, who traces every problem to his bowel movements',
      Genre: 'Comedy',
      Director: 'Shoojit Sircar',
    },
    {
      ID: 2,
      Title: '3-Idiots',
      Description:
        '3 IDIOTS follows college best friends, Farhan (R. Madhavan) and Raju (Sharman Joshi), who drive down to Shimla in search for Rancho (Aamir Khan), their long-lost buddy. During their journey, they recall the times they shared together, the mischief they got up to, and all that they learned from Rancho',
      Genre: 'Drama',
      Director: 'Rajkumar Hirani',
    },
    {
      ID: 3,
      Title: 'PK',
      Description:
        'An alien on Earth loses the only device he can use to communicate with his spaceship. His innocent nature and child-like questions force the country to evaluate the impact of religious views on people',
      Genre: 'Fantasy',
      Director: 'Rajkumar Hirani',
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleBackClick = () => {
    setSelectedMovie(null);
  };

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {selectedMovie ? (
        <MovieView movie={selectedMovie} onBackClick={handleBackClick} />
      ) : (
        <div>
          <h1>Main View</h1>
          <div className="movie-list">
            {movies.map((movie) => (
              <MovieCard
                key={movie.ID}
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

export default MainView;