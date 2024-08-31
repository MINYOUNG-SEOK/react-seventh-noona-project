import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchUpcomingMovies = async () => {
    try {
        const response = await api.get(`/movie/upcoming?language=ko-KR`);
        return response.data;
    } catch (error) {
        console.error("Error fetching upcoming movies", error);
        throw error;
    }
}

export const useUpcomingMoviesQuery = () => {
    return useQuery({
        queryKey: ['upcomingMovies'],
        queryFn: fetchUpcomingMovies,
        onSuccess: (data) => console.log('Fetched data:', data),
        onError: (error) => console.error('Fetching error:', error),
    });
};
