import React, { useRef, useCallback } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './MovieSlider.style.css';

const MovieSlider = ({ title, data }) => {
    const slideRef = useRef(null);

    const handleScroll = useCallback((direction) => {
        if (slideRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = slideRef.current;
            const scrollAmount = 300;

            if (direction === 'left') {
                if (scrollLeft <= 0) {
                    slideRef.current.scrollLeft = scrollWidth / 2;
                } else {
                    slideRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                }
            } else {
                if (scrollLeft + clientWidth >= scrollWidth - 10) {
                    slideRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    slideRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            }
        }
    }, []);

    const handleButtonClick = useCallback((e, direction) => {
        e.preventDefault();
        e.stopPropagation();
        handleScroll(direction);
    }, [handleScroll]);

    const handleTouchMove = useCallback((e) => {
        e.preventDefault();
    }, []);

    return (
        <div className='movie__slide' onTouchMove={handleTouchMove}>
            <h1 className='movie__slide__title'>{title}</h1>
            <button
                className='slide__button left'
                onClick={(e) => handleButtonClick(e, 'left')}
                onTouchStart={(e) => e.preventDefault()}
            >
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <div className='slide__container' ref={slideRef}>
                {data.map((movie, index) => (
                    <MovieCard movie={movie} key={index} />
                ))}
            </div>
            <button
                className='slide__button right'
                onClick={(e) => handleButtonClick(e, 'right')}
                onTouchStart={(e) => e.preventDefault()}
            >
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
        </div>
    );
};

export default MovieSlider;