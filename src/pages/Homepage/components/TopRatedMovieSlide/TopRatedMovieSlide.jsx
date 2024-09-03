import React from 'react';
import { useTopRatedMoviesQuery } from '../../../../hooks/useTopRatedMovies';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import Spinner from '../../../../common/Spinner/Spinner';

const TopRatedMovieSlide = () => {
    const { data, isLoading, isError, error } = useTopRatedMoviesQuery();

    if (isLoading) return <Spinner />;
    if (isError) {
        console.error('Error:', error);
        return <div>Error fetching data</div>;
    }

    if (!data || !data.results) {
        return <div>No movies found</div>;
    }

    return <MovieSlider title="최고 평점 영화" data={data.results} />;
};

export default TopRatedMovieSlide;
