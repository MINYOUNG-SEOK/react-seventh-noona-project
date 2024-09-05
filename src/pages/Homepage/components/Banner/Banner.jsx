import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useKoreanMoviesQuery } from '../../../../hooks/useKoreanMovies';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../../../../common/Spinner/Spinner';
import './Banner.style.css';

const Banner = () => {
    const navigate = useNavigate(); 
    const { data, isLoading, error, isError } = useKoreanMoviesQuery();

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        console.error('Error:', error);
        return <div>Error fetching data</div>;
    }

    const popularMovies = data?.results?.filter(movie => movie.vote_average >= 6) || [];

    if (popularMovies.length === 0) {
        console.error('No popular movies available');
        return <div>No popular movies available</div>;
    }

    const randomIndex = Math.floor(Math.random() * popularMovies.length);
    const movie = popularMovies[randomIndex];

    if (!movie || !movie.backdrop_path) {
        console.error('No movie data available or missing poster path');
        return <div>No movie data available</div>;
    }

    const imageUrl = `https://www.themoviedb.org/t/p/original${movie.backdrop_path}`;

    const handlePlayClick = (e) => {
        e.stopPropagation();
        window.location.href = 'https://www.netflix.com/kr/login';
    };

    const handleInfoClick = (e) => {
        e.stopPropagation();
        navigate(`/movies/${movie.id}`); 
    };


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
                    <button
                        className="banner__button"
                        aria-label="Play"
                        onClick={handlePlayClick}
                    >
                        <FontAwesomeIcon icon={faPlay} className='banner__icon' />
                        재생
                    </button>
                    <button className='banner__button' onClick={handleInfoClick}>
                        <FontAwesomeIcon icon={faAngleDown} className='banner__icon' />
                        상세 정보
                    </button>
                </div>
            </div>
            <div className='banner__fadeBottom'></div>
        </header>
    );
};

export default Banner;
