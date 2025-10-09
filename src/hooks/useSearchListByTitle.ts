import { useQuery } from "@tanstack/react-query"
import { fetchMovieList, Movie } from "../api/Movie"
import { queryClient } from "../api/QueryClient"

interface useSearchListResp {
  data: Movie[] | undefined
  isPending: boolean,
  isError: boolean,
  error: Error | null
}


export const useSearchListByTitle = (title: string): useSearchListResp => {
  const url = new URL(`https://cinemaguide.skillbox.cc/movie`)
  if (title) {
    url.search = new URLSearchParams({ "title": title }).toString()
  }
  const { data, isPending, isError, error } = useQuery({
    queryKey: [title],
    queryFn: () => fetchMovieList(url),
    initialData: undefined,
    enabled: !!title
  },
    queryClient)

  return { data, isPending, isError, error }
}