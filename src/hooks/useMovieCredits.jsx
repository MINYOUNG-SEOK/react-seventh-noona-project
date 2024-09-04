import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMovieCredits = async (movieId) => {
    try {
        const response = await api.get(`/movie/${movieId}/credits?language`, {
            params: { language: 'ko-KR' },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching movie credits:', error);
        throw error;
    }
};

export const useMovieCreditsQuery = (movieId) => {
    return useQuery({
        queryKey: ['movie-credits', movieId],
        queryFn: () => fetchMovieCredits(movieId),
        staleTime: 300000,
        onSuccess: (data) => console.log('Fetched movie credits:', data),
        onError: (error) => console.error('Fetching movie credits error:', error),
    });
};
