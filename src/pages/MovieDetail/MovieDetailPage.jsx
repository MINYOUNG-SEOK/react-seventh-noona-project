import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetailPage.style.css';
import Trailer from '../Homepage/components/Trailer/Trailer';
import Reviews from '../Homepage/components/Reviews/Reviews';
import Recommendations from '../Homepage/components/Recommendations/Recommendations';

const MovieDetailPage = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('reviews');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="movie-detail-page">
            <div className='movie-left'>
                <div className="movie-left-up">
                    <Trailer movieId={id} />
                </div>

                <div className="movie-left-down">
                    영화 정보 영역
                </div>
            </div>

            <div className="movie-right">
                <div className="tabs">
                    <button onClick={() => setActiveTab('reviews')}>리뷰</button>
                    <button onClick={() => setActiveTab('recommendations')}>추천 콘텐츠</button>
                </div>
                {activeTab === 'reviews' ? (
                    <Reviews movieId={id} />
                ) : (
                    <div className="recommendation-container detail-recommendations">
                        <Recommendations movieId={id} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieDetailPage;
