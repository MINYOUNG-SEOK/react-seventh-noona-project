import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchKoreanMovies = async () => {
    try {
        const response = await api.get(`/discover/movie`, {
            params: {
                language: 'ko-KR',
                sort_by: 'popularity.desc',
                region: 'KR',
                with_original_language: 'ko',
                certification_country: 'KR',
                'certification.lte': '15',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching Korean movies:", error);
        throw error;
    }
}

export const useKoreanMoviesQuery = () => {
    return useQuery({
        queryKey: ['korean-movies'],
        queryFn: fetchKoreanMovies,
        onSuccess: (data) => console.log('Fetched data:', data),
        onError: (error) => console.error('Fetching error:', error),
    });
};
