import React, { useEffect } from 'react';
import MovieCard from '../../../../common/MovieCard/MovieCard';
import Spinner from '../../../../common/Spinner/Spinner';
import './Recommendations.style.css';

import { useMovieRecommendationsQuery } from '../../../../hooks/useMovieRecommendations';

const Recommendations = ({ movieId }) => {
    const { data: recommendations = [], isLoading, isError } = useMovieRecommendationsQuery(movieId);

    useEffect(() => {
        console.log('추천 콘텐츠 데이터:', recommendations);
    }, [recommendations]);

    if (isLoading) return <Spinner />;
    if (isError) return <p>문제가 발생했습니다!</p>;

    return (
        <div className="recommendations-container">
            <div className="recommendations-list">
                {recommendations.length > 0 ? (
                    recommendations.map((movie) => <MovieCard key={movie.id} movie={movie} />)
                ) : (
                    <p>추천할 콘텐츠가 없습니다</p>
                )}
            </div>
        </div>
    );
};

export default Recommendations;
