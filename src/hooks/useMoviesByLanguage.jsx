// src/hooks/useMoviesByLanguage.js
import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMoviesByLanguage = async (language, sortOrder, page) => {
  try {
    const response = await api.get(`/discover/movie`, {
      params: {
        language: 'ko-KR',
        with_original_language: language,
        sort_by: sortOrder,
        page, 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movies by language", error);
    throw error;
  }
};

export const useMoviesByLanguageQuery = (language, sortOrder, page) => {
  return useQuery({
    queryKey: ['moviesByLanguage', language, sortOrder, page], // 페이지를 쿼리 키에 포함
    queryFn: () => fetchMoviesByLanguage(language, sortOrder, page), // 페이지를 쿼리 함수에 전달
    onSuccess: (data) => console.log('Fetched movies:', data),
    onError: (error) => console.error('Fetching error:', error),
    staleTime: 5 * 60 * 1000,
  });
};
