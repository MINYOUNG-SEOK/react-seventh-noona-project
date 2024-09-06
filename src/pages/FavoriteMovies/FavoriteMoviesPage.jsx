import React, { useEffect, useState } from 'react';
import MovieCard from '../../common/MovieCard/MovieCard'; 
import './FavoriteMoviesPage.style.css'; 

const FavoriteMoviesPage = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const movies = localStorage.getItem('savedMovies');
    setFavoriteMovies(movies ? JSON.parse(movies) : []);
  }, []);

  return (
    <div className="favorite-movies-page">
      <h2 className="page-title">내가 찜한 리스트</h2>
      {favoriteMovies.length > 0 ? (
        <div className="favorite-movies-container">
          {favoriteMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="no-results">찜한 영화가 없습니다.</p>
      )}
    </div>
  );
};

export default FavoriteMoviesPage;
