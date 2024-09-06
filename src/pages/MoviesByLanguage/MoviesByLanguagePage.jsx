import React, { useState } from 'react';
import { useMoviesByLanguageQuery } from '../../hooks/useMoviesByLanguage';
import MovieCard from '../../common/MovieCard/MovieCard'; 
import Spinner from '../../common/Spinner/Spinner'; 
import './MoviesByLanguagePage.style.css'; 

const MoviesByLanguagePage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en'); 
  const [sortOrder, setSortOrder] = useState('popularity.desc'); 
  const { data: movies, isLoading, isError } = useMoviesByLanguageQuery(selectedLanguage, sortOrder);

  const languages = [
    { code: 'id', name: '인도네시아어' },
    { code: 'ms', name: '말레이어' },
    { code: 'tr', name: '터키어' },
    { code: 'en', name: '영어' },
    { code: 'ja', name: '일본어' },
    { code: 'es', name: '스페인어' },
    { code: 'fr', name: '프랑스어' },
    { code: 'hi', name: '힌디어' },
    { code: 'ko', name: '한국어' },
    { code: 'de', name: '독일어' },
    { code: 'ru', name: '러시아어' },
    { code: 'it', name: '이탈리아어' },
    { code: 'pt', name: '포르투갈어' },
    { code: 'nl', name: '네덜란드어' },
    { code: 'sv', name: '스웨덴어' },
    { code: 'ar', name: '아랍어' },
    { code: 'da', name: '덴마크어' },
    { code: 'th', name: '태국어' },
    { code: 'fi', name: '핀란드어' },
    { code: 'no', name: '노르웨이어' },
    { code: 'vi', name: '베트남어' },
  ];

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div className="movies-by-language-page">
      <h2 className="page-title">언어별로 찾아보기</h2>
      <div className="filters">
        <label htmlFor="language-select">언어: </label>
        <select id="language-select" value={selectedLanguage} onChange={handleLanguageChange}>
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>

        <label htmlFor="sort-select" style={{ marginLeft: '20px' }}>정렬 기준: </label>
        <select id="sort-select" value={sortOrder} onChange={handleSortOrderChange}>
          <option value="popularity.desc">인기순</option>
          <option value="release_date.desc">최신순</option>
        </select>
      </div>

      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <p className="error-message">영화를 불러오는 중 오류가 발생했습니다.</p>
      ) : (
        <div className="movies-grid">
          {movies && movies.length > 0 ? (
            movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          ) : (
            <p className="no-results">검색 결과가 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MoviesByLanguagePage;
