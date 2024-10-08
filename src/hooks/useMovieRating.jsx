import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMovieRating = async (movieId) => {
    try {
        const response = await api.get(`/movie/${movieId}/release_dates`, {
            params: { language: 'ko-KR' },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("서버 응답:", error.response.data);
        } else if (error.request) {
            console.error("응답 없음:", error.request);
        } else {
            console.error("요청 설정 오류:", error.message);
        }
        throw error;
    }
};

export const useMovieRatingQuery = (movieId) => {
    return useQuery({
        queryKey: ['movie-rating', movieId],
        queryFn: () => fetchMovieRating(movieId),
        select: (result) => {
            const krRelease = result.results.find((release) => release.iso_3166_1 === 'KR');
            if (krRelease && krRelease.release_dates.length > 0) {
                let certification = krRelease.release_dates[0].certification;

                certification = certification.toUpperCase();

                // 특정 등 변환 처리
                switch (certification) {
                    case 'ALL':
                    case 'All':
                        certification = 'All';
                        break;
                    case '12':
                        certification = '12+';
                        break;
                    case '15':
                        certification = '15+';
                        break;
                    case '18':
                    case '19':
                        certification = '19+';
                        break;
                    default:
                        certification = certification || '등급 정보 없음';
                }

                return certification;
            }
            return '등급 정보 없음';
        },
        staleTime: 300000,
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    });
};
