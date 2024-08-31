import React from 'react';
import { useKoreanMoviesQuery } from '../../../../hooks/useKoreanMovies';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';

const KoreanMovieSlide = () => {
    const { data, isLoading, isError, error } = useKoreanMoviesQuery();

    if (isLoading) return <div>Loading...</div>;
    if (isError) {
        console.error('Error:', error);
        return <div>Error fetching data</div>;
    }

    return <MovieSlider title="한국 영화" data={data.results} />;
};

export default KoreanMovieSlide;
