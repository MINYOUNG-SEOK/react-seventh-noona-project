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

    const popularMovies = data.results.filter(movie => movie.vote_average >= 6);

    const randomIndex = Math.floor(Math.random() * popularMovies.length);
    const movie = popularMovies[randomIndex];

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
