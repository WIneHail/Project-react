import { useQuery } from "@tanstack/react-query"
import { fetchMovie, Movie } from "../api/Movie"
import { queryClient } from "../api/QueryClient"

interface useMovieResp {
  data: Movie,
}


interface useMovieProps {
  query: string
}

const getInitialMovieData = () => ({
  id: 0,
  title: '',
  originalTitle: '',
  language: '',
  releaseYear: null,
  releaseDate: null,
  genres: [],
  plot: '',
  runtime: 0,
  budget: null,
  revenue: null,
  homepage: '',
  status: '',
  posterUrl: null,
  backdropUrl: null,
  trailerUrl: '',
  trailerYouTubeId: '',
  tmdbRating: 0,
  searchL: '',
  keywords: [],
  countriesOfOrigin: [],
  languages: [],
  cast: [],
  director: null,
  production: null,
  awardsSummary: null
});


export const useMovie = ({ query }: useMovieProps): useMovieResp => {

  const data = useQuery({
    queryKey: ['movie', query],
    queryFn: () => fetchMovie(query),
    initialData: getInitialMovieData,
    retry: false,
    throwOnError: true,
  },
    queryClient)

  return data
}