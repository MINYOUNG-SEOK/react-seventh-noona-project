import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchSearchMovie = async ({ keyword, genre, page }) => {
    const language = 'ko-KR';

    if (keyword) {
        return api.get(`/search/movie?query=${keyword}&page=${page}&language=${language}`);
    } else if (genre) {
        return api.get(`/discover/movie?with_genres=${genre}&page=${page}&language=${language}`);
    }
    return api.get(`/movie/popular?page=${page}&language=${language}`);
};

export const useSearchMovieQuery = ({ keyword, genre, page }) => {
    return useQuery({
        queryKey: ['movie-search', keyword, genre, page],
        queryFn: () => fetchSearchMovie({ keyword, genre, page }),
        select: (result) => result.data,
        enabled: Boolean(page !== null),
    });
};
