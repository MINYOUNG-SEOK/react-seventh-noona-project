import React, { useState, useEffect, useRef } from 'react';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';
import { useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import MovieCard from '../../common/MovieCard/MovieCard';
import ReactPaginate from 'react-paginate';
import './MoviePage.style.css';

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const [inputValue, setInputValue] = useState('');
  const keyword = query.get('q') || '';
  const genre = query.get('genre');
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [page, setPage] = useState(1);

  const inputRef = useRef(null);

  const { data: movies, isLoading, refetch, isError } = useSearchMovieQuery({
    keyword,
    genre: selectedGenre,
    page,
  });

  const { data: genres, isLoading: genresLoading } = useMovieGenreQuery();

  useEffect(() => {
    refetch();
  }, [keyword, selectedGenre, page, refetch]);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
    setPage(1);
    setQuery({ q: inputValue, genre: genreId, page: 1 });
  };

  const handleShowAll = () => {
    setSelectedGenre(null);
    setPage(1);
    setQuery({ q: inputValue, page: 1 });
  };

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = () => {
    if (inputValue.trim()) {
      setQuery({ q: inputValue, genre: selectedGenre, page: 1 });
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

  // 안전하게 데이터를 필터링합니다.
  const filteredMovies = movies?.results?.filter((movie) =>
    selectedGenre ? movie.genre_ids.includes(Number(selectedGenre)) : true
  ) || [];

  const totalPages = movies?.total_pages || 1;

  // 로딩 중이거나 에러가 있을 때의 화면 처리
  if (isLoading || genresLoading) {
    return <p>로딩 중...</p>;
  }

  if (isError) {
    return <p>데이터를 불러오는 중 오류가 발생했습니다.</p>;
  }

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
          {filteredMovies.map((movie) => (
            <div className="movie-card" key={movie.id}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>

      <div className="pagination">
        <ReactPaginate
          nextLabel={<FontAwesomeIcon icon={faChevronRight} className="page-arrow" />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={totalPages}
          previousLabel={<FontAwesomeIcon icon={faChevronLeft} className="page-arrow" />}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={page - 1}
        />
      </div>
    </div>
  );
};

export default MoviePage;
