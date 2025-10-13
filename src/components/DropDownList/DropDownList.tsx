import './style.scss';

import { FC } from 'react';
import { Link } from 'react-router-dom';

import { MoviesList } from '../../api/Movie';
import { useAppDispatch } from '../../app/hooks';
import { closeModal } from '../../app/modalSlice';
import { changeValue } from '../../app/searchSlice';
import imageNotFound from '../../assets/img/background/No_Image_Available.jpg';
import { numberConverter } from '../../utils/numberConverter';
import { Rating } from '../Rating/Rating';

interface DropDownListProps {
    movieList: MoviesList | undefined;
    isActive: boolean;
    setDropDownState: React.Dispatch<React.SetStateAction<boolean>>;
}
export const DropDownList: FC<DropDownListProps> = ({
    movieList,
    isActive,
    setDropDownState,
}) => {
    const dispatch = useAppDispatch();

    const root = document.querySelector('html');

    const closeDropDown = () => {
        setDropDownState(false);
        dispatch(closeModal());
        dispatch(changeValue(''));
        if (root) {
            root.style.overflow = 'auto';
        }
    };

    return (
        <div
            className={isActive && movieList ? 'drop-down active' : 'drop-down'}
        >
            <ul className="drop-down__list">
                {movieList?.map((item, i) => {
                    const formatedRuntime = numberConverter(item.runtime);
                    if (i < 5)
                        return (
                            <li key={item.id} className="drop-down__item">
                                <Link
                                    to={`/movie/${item.id}`}
                                    className="drop-down__link"
                                    onClick={closeDropDown}
                                >
                                    <img
                                        className="drop-down__img"
                                        src={
                                            item.posterUrl
                                                ? item.posterUrl
                                                : imageNotFound
                                        }
                                        alt="drop-down-pic"
                                    />
                                    <div className="drop-down__wrapper">
                                        <div className="drop-down__top">
                                            <Rating
                                                isSmall={true}
                                                className="drop-down__rating"
                                                rating={item.tmdbRating}
                                            />
                                            <div className="content__year">
                                                {item.releaseYear}
                                            </div>
                                            <div className="content__genres">
                                                {item.genres[0]}
                                            </div>
                                            <div className="content__runtime">
                                                {formatedRuntime}
                                            </div>
                                        </div>
                                        <p className="drop-down__header">
                                            {item.title}
                                        </p>
                                    </div>
                                </Link>
                            </li>
                        );
                })}
            </ul>
        </div>
    );
};
