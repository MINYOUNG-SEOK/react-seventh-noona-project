import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMoviesByLanguage = async (language) => {
    try {
        const response = await api.get(`/discover/movie`, {
            params: {
                language: 'ko-KR', 
                with_original_language: language,
                sort_by: 'popularity.desc', 
            },
        });
        return response.data.results; 
    } catch (error) {
        console.error("Error fetching movies by language", error);
        throw error;
    }
};

export const useMoviesByLanguageQuery = (language) => {
    return useQuery({
        queryKey: ['moviesByLanguage', language], 
        queryFn: () => fetchMoviesByLanguage(language), 
        onSuccess: (data) => console.log('Fetched movies:', data),
        onError: (error) => console.error('Fetching error:', error),
        staleTime: 5 * 60 * 1000, 
    });
};
