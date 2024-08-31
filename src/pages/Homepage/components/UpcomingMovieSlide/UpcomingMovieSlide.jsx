// UpcomingMovieSlide.js
import React from 'react';
import { useUpcomingMoviesQuery } from '../../../../hooks/useUpcomingMovies'; // 올바른 경로로 수정
import MovieSlide from '../MovieSlide/MovieSlide';

const UpcomingMovieSlide = () => {
    const { data, isLoading, isError, error } = useUpcomingMoviesQuery();

    if (isLoading) return <div>Loading...</div>;
    if (isError) {
        console.error('Error:', error);
        return <div>Error fetching data</div>;
    }

    return <MovieSlide title="개봉 예정 영화" data={data.results} />;
};

export default UpcomingMovieSlide;
