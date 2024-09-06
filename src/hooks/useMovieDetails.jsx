// useMovieDetailsQuery.js
import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMovieDetails = async (movieId) => {
    try {
        const response = await api.get(`/movie/${movieId}`, {
            params: { language: 'ko-KR' },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
};

export const useMovieDetailsQuery = (movieId) => {
    return useQuery({
        queryKey: ['movie-details', movieId],
        queryFn: () => fetchMovieDetails(movieId),
        staleTime: 300000,
        onSuccess: (data) => console.log('Fetched movie details:', data),
        onError: (error) => console.error('Fetching error:', error),
    });
};
