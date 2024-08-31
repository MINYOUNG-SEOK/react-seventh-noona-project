import React from 'react';
import './MovieCard.style.css';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';



const MovieCard = ({ movie }) => {
    const imageUrl = `https://www.themoviedb.org/t/p/original${movie.poster_path}`;
    const { data: genres = [], isLoading, error } = useMovieGenreQuery();



    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading genres.</div>;
    }

    const genreMap = genres.reduce((acc, genre) => {
        acc[genre.id] = genre.name;
        return acc;
    }, {});

    const genreNames = movie.genre_ids?.map((id) => genreMap[id]).filter(Boolean).join(' • ') || '장르 정보 없음';

    const releaseDate = movie.release_date
        ? new Date(movie.release_date).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        : '';

    const rating = movie.adult ? 'OVER 19' : 'UNDER 19';

    return (
        <div className="movie__cards">
            <div
                className="movie__card"
                style={{
                    backgroundImage: `url(${imageUrl})`,
                }}
            >
                {/* <div className="movie__card__overlay">
                    <div className="movie__card__info">
                        {rating && <div className="movie__rating adult">{rating}</div>}
                        {releaseDate && <div>{releaseDate}</div>}
                        {movie.vote_average !== undefined && <div>평점: {movie.vote_average}</div>}
                    </div>
                    <div className="movie__card__keywords">{genreNames}</div>
                </div> */}
            </div>
        </div>
    );
};

export default MovieCard;
