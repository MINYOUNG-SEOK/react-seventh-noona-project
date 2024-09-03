import React from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetailPage.style.css';
import Trailer from '../Homepage/components/Trailer/Trailer';
// import Details from '../../components/Details/Details';
// import Reviews from '../../components/Reviews/Reviews';
// import Recommendations from '../../components/Recommendations/Recommendations';

const MovieDetailPage = () => {
    const { id } = useParams();
    return (
        <div className="movie-detail-page">
            <div className="movie-left-up">
                <p>예고편 영역</p>
                <Trailer movieId={id} />
            </div>

            <div className="movie-left-down">

                <p>시놉시스, 장르, 출연진, 감독</p>
            </div>

            <div className="movie-right">
                <div className="tabs">
                    <button>리뷰</button>
                    <button>추천 콘텐츠</button>
                </div>
                {/* <Reviews />
                <Recommendations /> */}
            </div>
        </div>
    );
};

export default MovieDetailPage;
