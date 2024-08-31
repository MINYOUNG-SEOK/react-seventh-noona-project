// import { useQuery } from '@tanstack/react-query';
// import api from '../utils/api';


// const fetchNowPlayingMovies = async () => {
//     try {
//         const response = await api.get(`/movie/now_playing?language=ko-KR`);
//         console.log("API response data:", response.data);
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching now_playing movies:", error);
//         throw error;
//     }
// }

// export const useNowPlayingMoviesQuery = () => {
//     return useQuery({
//         queryKey: ['nowPlayingMovies'],
//         queryFn: fetchNowPlayingMovies,
//         onSuccess: (data) => console.log('Fetched data:', data), // 데이터가 올바르게 불러와지는지 확인
//         onError: (error) => console.error('Fetching error:', error), // 에러가 발생했을 때 확인
//     });
// };