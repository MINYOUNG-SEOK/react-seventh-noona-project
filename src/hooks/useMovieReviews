import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMovieReviews = async (id) => {
  try {
    const response = await api.get(`/movie/${id}/reviews?language=ko-KR`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie reviews:", error);
    throw error;
  }
};

export const useMovieReviewsQuery = (id) => {
  return useQuery({
    queryKey: ['movie-reviews', id],
    queryFn: () => fetchMovieReviews(id),
    onSuccess: (data) => console.log('Fetched reviews data:', data),
    onError: (error) => console.error('Fetching reviews error:', error),
  });
};
