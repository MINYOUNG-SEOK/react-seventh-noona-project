import React from 'react';
import { useTopRatedMoviesQuery } from '../../../../hooks/useTopRatedMovies'; // 경로를 정확히 확인하세요
import MovieSlide from '../MovieSlide/MovieSlide';

const TopRatedMovieSlide = () => {
    const { data, isLoading, isError, error } = useTopRatedMoviesQuery();

    if (isLoading) return <div>Loading...</div>;
    if (isError) {
        console.error('Error:', error);
        return <div>Error fetching data</div>;
    }

    if (!data || !data.results) {
        return <div>No movies found</div>;
    }

    return <MovieSlide title="최고 평점 영화" data={data.results} />;
};

export default TopRatedMovieSlide;
