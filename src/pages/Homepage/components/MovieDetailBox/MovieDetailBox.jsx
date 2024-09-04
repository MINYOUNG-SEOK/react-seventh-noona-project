import React from 'react';
import { useMovieCreditsQuery } from '../../../../hooks/useMovieCredits';
import { useMovieDetailsQuery } from '../../../../hooks/useMovieDetails';
import './MovieDetailBox.style.css';
import Spinner from '../../../../common/Spinner/Spinner';

const MovieDetailBox = ({ movieId }) => {
    const { data: movie, isLoading: isLoadingMovie, isError: isErrorMovie } = useMovieDetailsQuery(movieId);
    const { data: credits, isLoading: isLoadingCredits, isError: isErrorCredits } = useMovieCreditsQuery(movieId);


    if (isLoadingMovie || isLoadingCredits) return <Spinner />
    if (isErrorMovie || isErrorCredits) return <p>영화 정보를 불러오는 중 오류가 발생했습니다.</p>;


    const director = credits?.crew?.find((member) => member.job === 'Director')?.name || '감독 정보 없음';
    const cast = credits?.cast?.slice(0, 5).map((actor) => actor.name).join(', ') || '출연진 정보 없음';
    const genres = movie?.genres ?? [];

    return (
        <div className="movie-detail-box">
            <h3>시놉시스</h3>
            <p>{movie?.overview || '시놉시스 정보 없음'}</p>
            <hr />
            <h4>장르</h4>
            <div className="movie-genres">
                {Array.isArray(genres) && genres.length > 0
                    ? genres.map((genre) => <span key={genre.id} className="genre-tag">#{genre.name}</span>)
                    : '장르 정보 없음'}
            </div>
            <hr />
            <h4>출연진</h4>
            <p>{cast}</p>
            <hr />
            <h4>감독</h4>
            <p>{director}</p>
        </div>
    );
};

export default MovieDetailBox;
