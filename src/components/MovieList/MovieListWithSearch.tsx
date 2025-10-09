import { FC } from "react"
import { MovieList } from "./MovieList"
import { useSearchParams } from "react-router-dom"
import { genresTranslate } from "../../api/Genres"

export const MovieListWithSearch: FC = () => {

  const [searchParams, setSearchParams] = useSearchParams()

  const genre = genresTranslate.find(
    elem => elem.value === searchParams.get('genre')
  )

  let currentCount = Number(searchParams.get('count'))


  const nextPageOnClick = () => {
    const nextCount = currentCount + 10
    setSearchParams(searchParams => {
      searchParams.set('count', nextCount.toString())
      return searchParams
    })
  }
  return (
    <MovieList
      listTitle={genre?.translate}
      query={'movie'}
      searchParams={searchParams}
      isTopTen={false}
      nextPageHandler={nextPageOnClick}
    />
  )
}