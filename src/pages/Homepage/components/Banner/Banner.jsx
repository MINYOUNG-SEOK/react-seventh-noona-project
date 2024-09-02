import React from 'react';
import { useKoreanMoviesQuery } from '../../../../hooks/useKoreanMovies';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import './Banner.style.css';

const Banner = () => {
    const { data, isLoading, error, isError } = useKoreanMoviesQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        console.error('Error:', error);
        return <div>Error fetching data</div>;
    }

    // 옵셔널 체이닝을 사용하여 data와 results가 안전하게 접근되도록 함
    const popularMovies = data?.results?.filter(movie => movie.vote_average >= 6) || [];

    // 데이터가 비어있을 경우를 처리
    if (popularMovies.length === 0) {
        console.error('No popular movies available');
        return <div>No popular movies available</div>;
    }

    // 랜덤으로 영화 선택
    const randomIndex = Math.floor(Math.random() * popularMovies.length);
    const movie = popularMovies[randomIndex];

    // 영화 데이터 유효성 검사
    if (!movie || !movie.backdrop_path) {
        console.error('No movie data available or missing poster path');
        return <div>No movie data available</div>;
    }

    const imageUrl = `https://www.themoviedb.org/t/p/original${movie.backdrop_path}`;

    return (
        <header
            className='banner'
            style={{
                backgroundImage: `url(${imageUrl})`,
            }}
        >
            <div className='banner__contents'>
                <div className='banner__logo'>
                    <img src='/img/netflixN__logo.png' alt='N Logo' className='banner__nLogo' />
                    <span className='banner__movieLabel'>영화</span>
                </div>
                <h1 className='banner__title'>{movie?.title || movie?.name || movie?.original_name}</h1>
                <h1 className='banner__description'>{movie?.overview}</h1>
                <div className='banner__buttons'>
                    <button className='banner__button'>
                        <FontAwesomeIcon icon={faPlay} className='banner__icon' />
                        재생
                    </button>
                    <button className='banner__button'>
                        <FontAwesomeIcon icon={faInfoCircle} className='banner__icon' />
                        상세 정보
                    </button>
                </div>
            </div>
            <div className='banner__fadeBottom'></div>
        </header>
    );
};

export default Banner;
