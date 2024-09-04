import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieCard.style.css';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';
import { useMovieRatingQuery } from '../../hooks/useMovieRating';
import { useMovieDetailsQuery } from '../../hooks/useMovieDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPlus, faAngleDown } from '@fortawesome/free-solid-svg-icons';

const MovieCard = ({ movie }) => {
    const navigate = useNavigate(); 
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

    const handlePlayClick = (e) => {
        e.stopPropagation();
        window.location.href = 'https://www.netflix.com/login';
    };

    const handleInfoClick = (e) => {
        e.stopPropagation(); 
        navigate(`/movies/${movie.id}`); 
    };

    return (
        <div className="movie__cards" style={{ cursor: 'pointer' }}>
            <div
                className="movie__card"
                style={{
                    backgroundImage: `url(${imageUrl})`,
                }}
            >
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
                                <span className="movie__age-rating">{rating}</span>
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
                            <button className="info-button" aria-label="More Info" data-tooltip="상세 정보" onClick={handleInfoClick}>
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
