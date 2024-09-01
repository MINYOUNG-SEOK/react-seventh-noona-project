import React from 'react';
import './MovieCard.style.css';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';
import { useMovieRatingQuery } from '../../hooks/useMovieRating';
import { useMovieDetailsQuery } from '../../hooks/useMovieDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPlus, faAngleDown } from '@fortawesome/free-solid-svg-icons';

const MovieCard = ({ movie }) => {
    const imageUrl = `https://www.themoviedb.org/t/p/original${movie.poster_path}`;
    const { data: genres = [], isLoading: genreLoading, error: genreError } = useMovieGenreQuery();
    const { data: rating, isLoading: ratingLoading, error: ratingError } = useMovieRatingQuery(movie.id);
    const { data: details, isLoading: detailsLoading, error: detailsError } = useMovieDetailsQuery(movie.id);


    if (genreLoading || ratingLoading || detailsLoading) {
        return <div>Loading...</div>;
    }

    if (genreError || ratingError || detailsError) {
        return <div>Error loading data.</div>;
    }

    const formattedRuntime = details.runtime ? `${Math.floor(details.runtime / 60)}시간 ${details.runtime % 60}분` : '상영 시간 없음';

    const maxGenres = window.innerWidth <= 480 ? 1 : window.innerWidth <= 768 ? 2 : 3;

    const genreMap = genres.reduce((acc, genre) => {
        acc[genre.id] = genre.name;
        return acc;
    }, {});

    const genreNames = movie.genre_ids
        ?.map((id) => genreMap[id])
        .filter(Boolean)
        .slice(0, maxGenres)
        .join(' • ') || '장르 정보 없음';


    const formattedRating = movie.vote_average.toFixed(2);

    return (
        <div className="movie__cards">
            <div
                className="movie__card"
                style={{
                    backgroundImage: `url(${imageUrl})`,
                }}
            >
                <div className="overlay">
                    <div className="overlay__content">
                        <h3 className="movie__title">{movie.title}</h3>
                        <div className="movie__details">
                            <span className="movie__rating">⭐ {formattedRating}</span>
                            <span className="movie__genre">{genreNames}</span>
                            <div className="movie__info-row">
                                <span className="movie__duration">{formattedRuntime}</span>
                                <span className="movie__age-rating">{rating}</span>
                            </div>
                        </div>
                        <div className="movie__actions">
                            <div className='left-buttons'>
                                <button className="play-button">
                                    <FontAwesomeIcon icon={faPlay} />
                                </button>
                                <button className="add-button">
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </div>
                            <button className="info-button">
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
