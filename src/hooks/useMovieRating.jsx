// hooks/useMovieRatingQuery.js
import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

// 시청 등급을 가져오는 함수
const fetchMovieRating = async (movieId) => {
    try {
        const response = await api.get(`/movie/${movieId}/release_dates`, {
            params: { language: 'ko-KR' },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching movie rating", error);
        throw error;
    }
};

// 시청 등급을 가져오는 리액트 쿼리 훅
export const useMovieRatingQuery = (movieId) => {
    return useQuery({
        queryKey: ['movie-rating', movieId],
        queryFn: () => fetchMovieRating(movieId),
        select: (result) => {
            // 한국 시청 등급 필터링
            const krRelease = result.results.find((release) => release.iso_3166_1 === 'KR');
            if (krRelease && krRelease.release_dates.length > 0) {
                // 시청 등급이 존재하면 +를 추가
                const certification = krRelease.release_dates[0].certification;
                return certification ? `${certification}+` : '등급 정보 없음';
            }
            return '등급 정보 없음';
        },
        staleTime: 300000,
        onSuccess: (data) => console.log('Fetched rating:', data),
        onError: (error) => console.error('Fetching error:', error),
    });
};
