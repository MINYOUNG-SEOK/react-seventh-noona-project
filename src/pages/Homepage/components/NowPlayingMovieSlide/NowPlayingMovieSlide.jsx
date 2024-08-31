// import React from 'react';
// import { useNowPlayingMoviesQuery } from '../../../../hooks/useNowPlayingMoives';
// import MovieSlide from '../MovieSlide/MovieSlide';

// const NowPlayingMovieSlide = () => {
//     const { data, isLoading, isError, error } = useNowPlayingMoviesQuery();

//     if (isLoading) return <div>Loading...</div>;
//     if (isError) {
//         console.error('Error:', error);
//         return <div>Error fetching data</div>;
//     }

//     return <MovieSlide title="현재 상영 중인 영화" data={data.results} />;
// };

// export default NowPlayingMovieSlide;
