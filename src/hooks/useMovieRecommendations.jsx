import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMovieRecommendations = async (id) => {
  try {
    const response = await api.get(`/movie/${id}/recommendations?language=ko-KR`);
    console.log("API Response:", response.data);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movie recommendations:", error);
    throw error;
  }
};


export const useMovieRecommendationsQuery = (id) => {
  return useQuery({
    queryKey: ['movie-recommendations', id],
    queryFn: () => fetchMovieRecommendations(id),
    enabled: !!id,
    onSuccess: (data) => console.log('Fetched recommendations data:', data),
    onError: (error) => console.error('Fetching recommendations error:', error),
  });
};
