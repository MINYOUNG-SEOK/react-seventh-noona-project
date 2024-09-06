// fetchSearchMovie.js
import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

// API 요청 함수
const fetchSearchMovie = async ({ keyword, genre, page, sortOrder }) => {
    const language = 'ko-KR';
    let sortBy = 'popularity.desc'; // 기본값 설정

    // 정렬 기준 설정
    switch (sortOrder) {
        case 'popular':
            sortBy = 'popularity.desc';
            break;
        case 'release':
            sortBy = 'release_date.desc';
            break;
        default:
            sortBy = 'popularity.desc';
    }

    // 키워드 검색 시에는 `search/movie` 사용
    if (keyword) {
        console.log('Fetching with search:', { keyword, page, language });
        // 키워드 검색에는 정렬이 적용되지 않음
        return api.get(
            `/search/movie?query=${keyword}&page=${page}&language=${language}`
        );
    }

    // 장르 검색 시 `discover/movie` 사용, 정렬 적용 가능
    if (genre) {
        console.log('Fetching with discover:', { genre, sortBy, page, language });
        return api.get(
            `/discover/movie?with_genres=${genre}&page=${page}&sort_by=${sortBy}&language=${language}`
        );
    }

    // 기본 인기 영화
    console.log('Fetching popular movies:', { page, sortBy, language });
    return api.get(`/discover/movie?page=${page}&sort_by=${sortBy}&language=${language}`);
};

// 훅에서 데이터 요청
export const useSearchMovieQuery = ({ keyword, genre, page, sortOrder }) => {
    return useQuery({
        queryKey: ['movie-search', keyword, genre, page, sortOrder],
        queryFn: () => fetchSearchMovie({ keyword, genre, page, sortOrder }),
        select: (result) => result.data,
        enabled: Boolean(page !== null),
    });
};
