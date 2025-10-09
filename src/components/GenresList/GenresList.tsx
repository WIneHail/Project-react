import { FC } from "react";
import './style.scss'
import { Genres, genresTranslate } from "../../api/Genres";
import { Link } from "react-router-dom";

interface GenresListProps {
  queryResp: Genres
}
export const GenresList: FC<GenresListProps> = ({ queryResp }) => {

  function getImgUrl(path: string) {
    return new URL(`/src/assets/img/background/${path}Back.png`, import.meta.url).href
  }

  return (
    <div className="genres-list">
      <h2 className="genres-list__header">Жанры фильмов</h2>
      <ul className="genres-list__list">
        {queryResp?.map((item, i) => (
          <li key={item} className="genres-list__item">
            <Link to={{
              pathname: '/movie',
              search: `?genre=${item}&count=10`
            }}
              className="genres-list__link">
              <img className="genres-list__img" src={getImgUrl(item)} alt="genre-pic" />
              <p className="genres-list__name">{genresTranslate[i].translate}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div >
  )
}