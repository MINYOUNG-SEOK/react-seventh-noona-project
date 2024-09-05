import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchSearchMovie = async ({ keyword, genre, page, sortOrder }) => {
    const language = 'ko-KR';
    let sortBy;

    if (sortOrder) {
        switch (sortOrder) {
            case 'popular':
                sortBy = 'popularity.desc';
                break;
            case 'least-popular':
                sortBy = 'popularity.asc';
                break;
            case 'release':
                sortBy = 'release_date.desc';
                break;
            default:
                sortBy = 'popularity.desc';
        }
    }

    if (keyword) {
        return api.get(`/search/movie?query=${keyword}&page=${page}&sort_by=${sortBy}&language=${language}`);
    } else if (genre) {
        return api.get(`/discover/movie?with_genres=${genre}&page=${page}&sort_by=${sortBy}&language=${language}`);
    }
    return api.get(`/movie/popular?page=${page}&language=${language}`);
};

export const useSearchMovieQuery = ({ keyword, genre, page, sortOrder }) => {
    return useQuery({
        queryKey: ['movie-search', keyword, genre, page, sortOrder],
        queryFn: () => fetchSearchMovie({ keyword, genre, page, sortOrder }),
        select: (result) => result.data,
        enabled: Boolean(page !== null),
    });
};
