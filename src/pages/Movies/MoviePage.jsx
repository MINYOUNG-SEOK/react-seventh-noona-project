import React, { useState, useEffect, useRef } from 'react';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';
import { useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import MovieCard from '../../common/MovieCard/MovieCard';
import './MoviePage.style.css';

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const [inputValue, setInputValue] = useState('');
  const keyword = query.get('q') || '';
  const genre = query.get('genre');
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [page, setPage] = useState(1);

  const inputRef = useRef(null);

  const { data: movies, isLoading, refetch } = useSearchMovieQuery({
    keyword,
    genre: selectedGenre,
    page,
  });

  const { data: genres } = useMovieGenreQuery();

  useEffect(() => {
    refetch();
  }, [keyword, selectedGenre, page, refetch]);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
    setQuery({ q: inputValue, genre: genreId });
    setPage(1);
  };

  const handleShowAll = () => {
    setSelectedGenre(null);
    setQuery({ q: inputValue });
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSearch = () => {
    if (inputValue.trim()) {
      setQuery({ q: inputValue, genre: selectedGenre });
      setPage(1);
      setInputValue('');
      inputRef.current.blur();
    }
  };




  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
      inputRef.current.blur();
    }
  };

  const filteredMovies = movies?.results.filter((movie) =>
    selectedGenre ? movie.genre_ids.includes(Number(selectedGenre)) : true
  );

  return (
    <div className="movie-page">
      <div className="search-bar">
        <div className="search-input-container">
          <input
            ref={inputRef}
            type="text"
            placeholder="원하는 장르별로 검색할 수 있어요!"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="input-icon"
            onClick={handleSearch}
          />
        </div>
      </div>

      <div className="genre-section">
        <button
          onClick={handleShowAll}
          className={selectedGenre === null ? 'active' : ''}
        >
          전체
        </button>
        {genres &&
          genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => handleGenreClick(genre.id)}
              className={selectedGenre === genre.id ? 'active' : ''}
            >
              {genre.name}
            </button>
          ))}
      </div>

      {!isLoading && filteredMovies && filteredMovies.length === 0 && (
        <p className="no-results">검색 결과가 없습니다.</p>
      )}

      <div className="movie-container">


        <div className="movie-list-section">
          {!keyword && !selectedGenre && (
            <h2 className="movie-title">지금 뜨고있는 영화</h2>
          )}
          {isLoading ? (
            <p>로딩 중...</p>
          ) : (
            filteredMovies &&
            filteredMovies.map((movie) => (
              <div className="movie-card">
                <MovieCard key={movie.id} movie={movie} />
              </div>
            ))
          )}
        </div>
      </div>

      <div className="pagination">
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          이전
        </button>
        <span>{page}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={!movies || !movies.results.length}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default MoviePage;