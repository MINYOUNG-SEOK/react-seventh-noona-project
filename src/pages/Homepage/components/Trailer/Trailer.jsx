import React from 'react';
import { useMovieTrailerQuery } from '../../../../hooks/useMovieTrailer';
import Spinner from '../../../../common/Spinner/Spinner';

const Trailer = ({ movieId }) => {
    const { data: trailer, error, isLoading } = useMovieTrailerQuery(movieId);

    if (isLoading) {
        return <Spinner />
    }

    if (error) {
        return <p>예고편을 불러오는 중 오류가 발생했습니다.</p>;
    }

    if (!trailer) {
        return <p>예고편을 찾을 수 없습니다.</p>;
    }

    return (
        <div className="trailer-container">
            <iframe
                width="100%"
                height="400px"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default Trailer;
