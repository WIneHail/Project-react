import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { fetchMovieList, Movie } from "../api/Movie"
import { queryClient } from "../api/QueryClient"

interface useMovieListResp {
  data: Movie[] | undefined
}


interface useMovieListProps {
  query: string
  searchParams?: URLSearchParams
}


export const useMovieList = ({ query, searchParams }: useMovieListProps): useMovieListResp => {
  const url = new URL(`https://cinemaguide.skillbox.cc/${query}`)
  if (searchParams) {
    url.search = searchParams.toString()
  }
  const count = searchParams ? searchParams?.get('count') : undefined
  const { data } = useQuery({
    queryKey: ['movieList', query, count],
    queryFn: () => fetchMovieList(url),
    initialData: undefined,
    placeholderData: keepPreviousData,
    throwOnError: true,
    retry: false,
  },
    queryClient)

  return { data }
}