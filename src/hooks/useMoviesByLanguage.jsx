import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMoviesByLanguage = async (language, sortOrder) => {
  try {
    const response = await api.get(`/discover/movie`, {
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
        language: 'ko-KR',
        with_original_language: language,
        sort_by: sortOrder,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies by language", error);
    throw error;
  }
};

export const useMoviesByLanguageQuery = (language, sortOrder) => {
  return useQuery({
    queryKey: ['moviesByLanguage', language, sortOrder],
    queryFn: () => fetchMoviesByLanguage(language, sortOrder),
    onSuccess: (data) => console.log('Fetched movies:', data),
    onError: (error) => console.error('Fetching error:', error),
    staleTime: 5 * 60 * 1000,
  });
};
