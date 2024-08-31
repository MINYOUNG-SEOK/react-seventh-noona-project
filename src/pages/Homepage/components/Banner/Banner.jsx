import React from 'react';
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies';
import './Banner.style.css';

const Banner = () => {
    const { data, isLoading, error, isError } = usePopularMoviesQuery();

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
                <h1 className='banner__title'>{movie?.title || movie?.name || movie?.original_name}</h1>
                <div className='banner__buttons'>
                    <button className='banner__button'>재생</button>
                    <button className='banner__button'>상세 정보</button>
                </div>
                <h1 className='banner__description'>{movie?.overview}</h1>
            </div>
            <div className='banner__fadeBottom'></div>
        </header>
    );
};

export default Banner;
