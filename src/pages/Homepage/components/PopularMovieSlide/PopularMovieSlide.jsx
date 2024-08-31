import React from 'react';
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies';
import MovieSlide from '../MovieSlide/MovieSlide';

const PopularMovieSlide = () => {
    const { data, isLoading, isError, error } = usePopularMoviesQuery();

    if (isLoading) return <div>Loading...</div>;
    if (isError) {
        console.error('Error:', error);
        return <div>Error fetching data</div>;
    }

    return <MovieSlide title="인기있는 영화" data={data.results} />;
};

export default PopularMovieSlide;
