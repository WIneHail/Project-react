import { useQuery } from "@tanstack/react-query"
import { Genres, fetchGenresList } from "../api/Genres"
import { queryClient } from "../api/QueryClient"

interface useGenresListResp {
  data: Genres | [],
}

export const useGenresList = (): useGenresListResp => {
  const data = useQuery({
    queryKey: ['genresList'],
    queryFn: () => fetchGenresList(),
    initialData: [],
    retry: false,
  },
    queryClient)

  return data
}