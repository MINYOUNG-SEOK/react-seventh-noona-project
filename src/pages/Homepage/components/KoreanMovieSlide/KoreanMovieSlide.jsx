import React from 'react';
import { useKoreanMoviesQuery } from '../../../../hooks/useKoreanMovies';
import MovieSlide from '../MovieSlide/MovieSlide';

const KoreanMovieSlide = () => {
    const { data, isLoading, isError, error } = useKoreanMoviesQuery();

    if (isLoading) return <div>Loading...</div>;
    if (isError) {
        console.error('Error:', error);
        return <div>Error fetching data</div>;
    }

    return <MovieSlide title="한국 영화" data={data.results} />;
};

export default KoreanMovieSlide;
