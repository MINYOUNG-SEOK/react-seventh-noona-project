import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieCard.style.css';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';
import { useMovieRatingQuery } from '../../hooks/useMovieRating';
import { useMovieDetailsQuery } from '../../hooks/useMovieDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPlus, faAngleDown } from '@fortawesome/free-solid-svg-icons';

const MovieCard = ({ movie }) => {
    const navigate = useNavigate();
    const [isFirstClick, setIsFirstClick] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const imageUrl = `https://www.themoviedb.org/t/p/original${movie?.poster_path}`;

    const { data: genres = [] } = useMovieGenreQuery();
    const { data: rating = '등급 정보 없음' } = useMovieRatingQuery(movie?.id);
    const { data: details = { runtime: 0 } } = useMovieDetailsQuery(movie?.id);

    const formattedRuntime = details?.runtime
        ? `${Math.floor(details.runtime / 60)}시간 ${details.runtime % 60}분`
        : '상영 시간 없음';

    const maxGenres = window.innerWidth <= 480 ? 1 : window.innerWidth <= 768 ? 2 : 3;

    const genreMap = genres.reduce((acc, genre) => {
        acc[genre.id] = genre.name;
        return acc;
    }, {});

    const genreNames =
        movie?.genre_ids?.map((id) => genreMap[id]).filter(Boolean).slice(0, maxGenres) || ['장르 정보 없음'];

    const formattedRating = movie?.vote_average?.toFixed(2) || '평점 없음';

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    const handlePlayClick = (e) => {
        e.stopPropagation();
        window.location.href = 'https://www.netflix.com/kr/login';
    };

    const handleInfoClick = (e) => {
        e.stopPropagation();
        if (isMobile && !isFirstClick) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
            navigate(`/movies/${movie.id}`);
        } else {
            setIsFirstClick(false);
            if (!isMobile) {
                navigate(`/movies/${movie.id}`);
            }
        }
    };

    const handleCardClick = (e) => {
        if (isFirstClick && isMobile) {
            setIsFirstClick(false);
        } else {
            e.stopPropagation();
        }
    };

    const handleImageError = (e) => {
        e.target.src = "https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-thumbnail-graphic-illustration-vector-png-image_40966590.jpg";
    };

    const ratingClass = {
        'ALL': 'rating-all',
        'All': 'rating-all',
        '12+': 'rating-12',
        '15+': 'rating-15',
        '18+': 'rating-18',
        '19+': 'rating-19',
    }[rating] || 'rating-default';

    return (
        <div className="movie__cards" style={{ cursor: 'pointer' }}>
            <div className="movie__card" onClick={handleCardClick}>
                <img
                    src={imageUrl}
                    alt={movie?.title || '제목 없음'}
                    className="movie__image"
                    onError={handleImageError}
                />
                <div className="overlay">
                    <div className="overlay__content">
                        <h3 className="movie__title">{movie?.title || '제목 없음'}</h3>
                        <div className="movie__details">
                            <span className="movie__rating">⭐{formattedRating}</span>
                            <div className="movie__genres">
                                {genreNames.map((genre, index) => (
                                    <span key={index} className="movie__genre">
                                        #{genre}
                                    </span>
                                ))}
                            </div>
                            <div className="movie__info-row">
                                <span className="movie__duration">{formattedRuntime}</span>
                                {rating !== '등급 정보 없음' && (
                                    <span className={`movie__age-rating ${ratingClass}`}>{rating}</span>
                                )}
                            </div>
                        </div>
                        <div className="movie__actions">
                            <div className="left-buttons">
                                <button
                                    className="play-button"
                                    aria-label="Play"
                                    onClick={handlePlayClick}
                                >
                                    <FontAwesomeIcon icon={faPlay} />
                                </button>
                                <button
                                    className="add-button"
                                    aria-label="Add to List"
                                    data-tooltip="찜한 리스트에 추가"
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </div>
                            <button
                                className="info-button"
                                aria-label="More Info"
                                data-tooltip="상세 정보"
                                onClick={handleInfoClick}
                            >
                                <FontAwesomeIcon icon={faAngleDown} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
