import axios from "axios";
import { API_KEY } from "./Components/Config";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: API_KEY,
    language: "ko-KR",
  },
});

export const moviesApi = {
  nowPlaying: () => api.get("movie/now_playing"),
  upcoming: () => api.get("movie/upcoming"),
  popular: () => api.get("movie/popular"),
  movieDetail: id =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  search: term =>
    api.get("search/movie", {
      params: {
        query: term,
      },
    }),
  trending: () => api.get("trending/movie/day"),
  cast: id =>
    api.get(`movie/${id}/credits`, {
      params: {
        append_to_response: "videos",
      },
    }),
  videos: id =>
    api.get(`movie/${id}/videos`, {
      params: {
        language: "en-US",
      },
    }),
  recommendationMovie: id =>
    api.get(`/movie/${id}/recommendations`, {
      params: {
        page : 1,
      },
    }),
};
// export const tvApi = {
//   topRated: () => api.get("tv/top_rated"),
//   popular: () => api.get("tv/popular"),
//   airingToday: () => api.get("tv/airing_today"),
//   showDetail: (id) =>
//     api.get(`tv/${id}`, {
//       params: {
//         append_to_response: "videos",
//       },
//     }),
//   search: (term) =>
//     api.get("search/tv", {
//       params: {
//         query: encodeURIComponent(term),
//       },
//     }),
// };
