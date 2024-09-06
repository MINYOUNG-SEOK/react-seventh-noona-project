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
      <h2 className="favorite-movies-page-title">내가 찜한 리스트</h2>
      {favoriteMovies.length > 0 ? (
        <div className="favorite-movies-container">
          {favoriteMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty-container">
          <div className="empty-image-wrapper">
            <img src='/img/empty-image.png' alt="Empty List" className="empty-image" />
          </div>
          <p className="empty-message">
            아직 찜한 콘텐츠가 없습니다
            <br />
            <span>나중에 보고 싶은 콘텐츠를 찜해주세요!</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default FavoriteMoviesPage;
