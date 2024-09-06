import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';


const fetchPopularMovies = async () => {
    try {
        const response = await api.get(`/movie/popular?language=ko-KR`);
        return response.data;
    } catch (error) {
        console.error("Error fetching popular movies:", error);
        throw error;
    }
}

export const usePopularMoviesQuery = () => {
    return useQuery({
        queryKey: ['movie-popular'],
        queryFn: fetchPopularMovies,
        onSuccess: (data) => console.log('Fetched data:', data),
        onError: (error) => console.error('Fetching error:', error),
    });
};
