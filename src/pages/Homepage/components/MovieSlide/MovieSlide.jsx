import React, { useRef } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './MovieSlide.style.css';

const MovieSlide = ({ title, data }) => {
    const slideRef = useRef(null);
    

    const handleLeftClick = () => {
        if (slideRef.current) {
            slideRef.current.scrollBy({ left: -300, behavior: 'smooth' });
            if (slideRef.current.scrollLeft <= 0) {
                slideRef.current.scrollLeft = slideRef.current.scrollWidth / 2;
            }
        }
    };

    const handleRightClick = () => {
        if (slideRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = slideRef.current;
            if (scrollLeft + clientWidth >= scrollWidth - 10) {
                slideRef.current.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                slideRef.current.scrollBy({ left: 300, behavior: 'smooth' });
            }
        }
    };

    return (
        <div className='movie__slide'>
            <h1 className='movie__slide__title'>{title}</h1>
            <button className='slide__button left' onClick={handleLeftClick}>
                &#10094;
            </button>
            <div className='slide__container' ref={slideRef}>
                {data.map((movie, index) => (
                    <MovieCard movie={movie} key={index} />
                ))}
            </div>
            <button className='slide__button right' onClick={handleRightClick}>
                &#10095;
            </button>
        </div>
    );
};

export default MovieSlide;
