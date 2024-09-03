import React from 'react';
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import Spinner from '../../../../common/Spinner/Spinner';

const PopularMovieSlide = () => {
    const { data, isLoading, isError, error } = usePopularMoviesQuery();

    if (isLoading)  return <Spinner />;
    if (isError) {
        console.error('Error:', error);
        return <div>Error fetching data</div>;
    }

    return <MovieSlider title="인기있는 영화" data={data.results} />;
};

export default PopularMovieSlide;
