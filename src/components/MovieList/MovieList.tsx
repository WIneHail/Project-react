import { FC } from "react";
import imageNotFound from "../../assets/img/background/No_Image_Available.jpg";
import BackImage from "../../assets/img/UI/chevron.svg?react";
import IconClose from "/src/assets/img/UI/close.svg?react";
import './style.scss'
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../Button/Button";
import { useMovieList } from "../../hooks/useMovieList";
import { useFavorites } from "../../hooks/useFavorites";

interface MovieListProps {
  listTitle?: string
  query: string
  searchParams?: URLSearchParams
  isTopTen: boolean
  canBeDelete?: boolean
  nextPageHandler?(): void
}
export const MovieList: FC<MovieListProps> = ({
  listTitle,
  query,
  searchParams,
  isTopTen,
  canBeDelete,
  nextPageHandler,
}) => {

  const navigate = useNavigate()

  const { data } = useMovieList({ query, searchParams })

  const { removeFavorite } = useFavorites()


  const sortedData = data?.sort((prev, next) => {
    if (prev.tmdbRating < next.tmdbRating) {
      return 1
    } else if (prev.tmdbRating > next.tmdbRating) {
      return -1
    }
    return 0;
  })

  return (
    <div className="movie-list">
      {listTitle &&
        <div className="movie-list__wrapper">
          {!isTopTen ?
            <Link
              className="movie-list__back"
              to={'..'}
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}>
              <BackImage />
              <h2 className="movie-list__header">{listTitle}</h2>
            </Link> :
            <h2 className="movie-list__header">{listTitle}</h2>
          }
        </div>
      }
      <ul className={searchParams ? "movie-list__list column" : "movie-list__list"}>
        {sortedData?.map((item, i) => (
          <li key={item.id} className="movie-list__item">
            {canBeDelete &&
              <Button
                children={<IconClose />}
                onClick={
                  () => removeFavorite(item.id.toString())
                }
                className="movie-list__btn btn-del"
                kind='round'
              ></Button>
            }
            <Link to={`/movie/${item.id}`} className="movie-list__link">
              <img className="movie-list__img" src={(item.posterUrl ? item.posterUrl : imageNotFound)} alt="movie-pic" />
              {isTopTen && <span className="movie-list__badge">{i + 1}</span>}
            </Link>
          </li>
        ))}
      </ul>
      {nextPageHandler &&
        <Button
          className="movie-list__more"
          kind='primary'
          onClick={() => {
            nextPageHandler()
          }
          }
        >Показать ещё</Button>}
    </div >
  )
}