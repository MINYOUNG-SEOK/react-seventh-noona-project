import { useQuery } from '@tanstack/react-query'
import api from '../utils/api'


const fetchMovieGenre = async () => {
    try {
        const response = await api.get(`/genre/movie/list`, {
            params: { language: 'ko-KR' },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching movie genre ", error);
        throw error;
    }
}

export const useMovieGenreQuery = () => {
    return useQuery({
        queryKey: ['movie-genre'],
        queryFn: fetchMovieGenre,
        select: (result) => result.genres,
        staleTime: 300000,
        onSuccess: (data) => console.log('Fetched data:', data),
        onError: (error) => console.error('Fetching error:', error),
    })
}


