import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetailPage.style.css';
import Trailer from '../Homepage/components/Trailer/Trailer';
import Reviews from '../Homepage/components/Reviews/Reviews';
import Recommendations from '../Homepage/components/Recommendations/Recommendations';
import MovieInfoBox from '../Homepage/components/MovieInfoBox/MovieInfoBox';
import MovieDetailBox from '../Homepage/components/MovieDetailBox/MovieDetailBox';

const MovieDetailPage = ({ movie }) => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('reviews');
    const [fade, setFade] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleTabChange = (tab) => {
        setFade(false);
        setTimeout(() => {
            setActiveTab(tab);
            setFade(true);
        }, 200);
    };

    return (
        <div className="movie-detail-page">
            <div className="movie-left">
                <div className="movie-left-up">
                    <Trailer movieId={id} />
                    <MovieInfoBox movieId={id} />
                    <MovieDetailBox movieId={id} />
                </div>
            </div>

            <div className="movie-right">
                <div className="tabs">
                    <button
                        className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
                        onClick={() => handleTabChange('reviews')}
                    >
                        리뷰
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'recommendations' ? 'active' : ''}`}
                        onClick={() => handleTabChange('recommendations')}
                    >
                        추천 콘텐츠
                    </button>
                </div>
                <div className={`tab-content ${fade ? 'fade-in' : 'fade-out'}`}>
                    {activeTab === 'reviews' ? (
                        <Reviews movieId={id} />
                    ) : (
                        <div className="recommendation-container detail-recommendations">
                            <Recommendations movieId={id} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MovieDetailPage;
