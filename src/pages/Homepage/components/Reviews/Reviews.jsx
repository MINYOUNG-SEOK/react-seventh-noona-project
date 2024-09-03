import React, { useState } from 'react';
import { useMovieReviewsQuery } from '../../../../hooks/useMovieReviews';
import './Reviews.style.css';
import Spinner from '../../../../common/Spinner/Spinner';

const Reviews = ({ movieId }) => {
    const [sortOrder, setSortOrder] = useState('latest');
    const { data, isLoading, isError, error } = useMovieReviewsQuery(movieId);

    if (isLoading) return <Spinner />
    if (isError) return <div>리뷰를 불러오는 중 오류가 발생했습니다: {error.message}</div>;

    const sortedReviews = () => {
        if (!data || !data.results) return [];

        const sortedData = [...data.results];
        if (sortOrder === 'high') {
            return sortedData.sort((a, b) => b.author_details.rating - a.author_details.rating);
        } else if (sortOrder === 'low') {
            return sortedData.sort((a, b) => a.author_details.rating - b.author_details.rating);
        } else {
            return sortedData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        }
    };

    return (
        <div className="reviews">
            <select className="sort-options" onChange={(e) => setSortOrder(e.target.value)}>
                <option value="latest">최신순</option>
                <option value="high">평점 높은 순</option>
                <option value="low">평점 낮은 순</option>
            </select>

            {sortedReviews().map((review) => (
                <ReviewItem key={review.id} review={review} />
            ))}
        </div>
    );
};

const ReviewItem = ({ review }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const maxLength = 150;

    const contentPreview = review.content.length > maxLength
        ? `${review.content.slice(0, maxLength)}...`
        : review.content;

    return (
        <div className="review">
            <div className="rating">
                {Array.from({ length: 5 }, (_, index) => (
                    <span
                        key={index}
                        style={{ color: index < parseInt(review.author_details.rating || 0, 10) ? '#f1c40f' : '#555' }}
                    >
                        {index < parseInt(review.author_details.rating || 0, 10) ? '★' : '☆'}
                    </span>
                ))}
            </div>
            <div className="review-header">
                <h3>{review.author}</h3>
                <p>{new Date(review.created_at).toLocaleDateString()}</p>
            </div>
            <p className="content">
                {isExpanded ? review.content : contentPreview}
                {review.content.length > maxLength && (
                    <button onClick={() => setIsExpanded(!isExpanded)}>
                        {isExpanded ? '접기' : '더보기'}
                    </button>
                )}
            </p>
        </div>
    );
};

export default Reviews;
