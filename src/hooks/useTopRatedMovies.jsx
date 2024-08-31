import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchTopRatedMovies = async () => {
    try {
        const response = await api.get(`/movie/top_rated?language=ko-KR`);
        return response.data;
    } catch (error) {
        console.error("Error fetching top-rated movies", error);
        throw error;
    }
}

export const useTopRatedMoviesQuery = () => {
    return useQuery({
        queryKey: ['topRatedMovies'],
        queryFn: fetchTopRatedMovies,
        onSuccess: (data) => console.log('Fetched data:', data),
        onError: (error) => console.error('Fetching error:', error),
    });
};
