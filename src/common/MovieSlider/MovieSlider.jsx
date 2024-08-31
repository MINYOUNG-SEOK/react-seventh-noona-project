import React, { useRef } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './MovieSlider.style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';


const MovieSlider = ({ title, data }) => {
    const slideRef = useRef(null);


    const handleLeftClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (slideRef.current) {
            slideRef.current.scrollBy({ left: -300, behavior: 'smooth' });
            if (slideRef.current.scrollLeft <= 0) {
                slideRef.current.scrollLeft = slideRef.current.scrollWidth / 2;
            }
        }
    };

    const handleRightClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
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
            <button className='slide__button left' onClick={handleLeftClick} onTouchStart={(e) => e.preventDefault()} >
                <FontAwesomeIcon icon={faChevronLeft} className='slide__button left' />
            </button>
            <div className='slide__container' ref={slideRef}>
                {data.map((movie, index) => (
                    <MovieCard movie={movie} key={index} />
                ))}
            </div>
            <button className='slide__button right' onClick={handleRightClick} onTouchStart={(e) => e.preventDefault()} >
                <FontAwesomeIcon icon={faChevronRight} className='slide__button Right' />
            </button>
        </div>
    );
};

export default MovieSlider;
