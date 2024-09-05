import React from 'react';
import { useMovieDetailsQuery } from '../../../../hooks/useMovieDetails';
import { useMovieRatingQuery } from '../../../../hooks/useMovieRating';

import './MovieInfoBox.style.css';
import Spinner from '../../../../common/Spinner/Spinner';

const MovieInfoBox = ({ movieId }) => {
    const { data: movie, isLoading, isError } = useMovieDetailsQuery(movieId);
    const { data: rating = '등급 정보 없음' } = useMovieRatingQuery(movieId);

    if (isLoading) return <Spinner />
    if (isError) return <p>영화 정보를 불러오는 중 오류가 발생했습니다.</p>;

    const formattedRating = movie?.vote_average ? movie.vote_average.toFixed(2) : '평점 없음';

    const ratingClass = {
        'ALL': 'rating-all',
        '12+': 'rating-12',
        '15+': 'rating-15',
        '18+': 'rating-18',
        '19+': 'rating-19',
    }[rating] || 'rating-default';

    return (
        <div className="movie-info-box">
            <h2 className="movie-title">{movie?.title || '제목 없음'}</h2>
            <div className="movie-details">
                <span className="movie-rating">⭐ {formattedRating}</span>
                <span className="separator">•</span>
                <span className="movie-genre">
                    {movie?.genres?.map((genre) => genre.name).join(', ') || '장르 정보 없음'}
                </span>
                <span className="separator">•</span>
                <span className="movie-year">{movie?.release_date?.split('-')[0] || '연도 정보 없음'}년</span>
                <span className="separator">•</span>
                <span className="movie-duration">
                    {movie?.runtime
                        ? `${Math.floor(movie.runtime / 60)}시간 ${movie.runtime % 60}분`
                        : '상영 시간 없음'}
                </span>
                {rating !== '등급 정보 없음' && (
                    <span className={`movie-rating-info ${ratingClass}`}>{rating}</span>
                )}
            </div>
        </div>
    );
};

export default MovieInfoBox;
