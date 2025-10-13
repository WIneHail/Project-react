import './style.scss';

import { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import FavoriteIcon from '/src/assets/img/UI/favorite.svg?react';
import LikeIcon from '/src/assets/img/UI/like.svg?react';
import RefreshIcon from '/src/assets/img/UI/refresh.svg?react';

import { queryClient } from '../../api/QueryClient';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { changeVideoId, openModal, toggleState } from '../../app/modalSlice';
import imageNotFound from '../../assets/img/background/No_Image_Available.jpg';
import { useFavorites } from '../../hooks/useFavorites';
import { useMovie } from '../../hooks/useMovie';
import {
    translateCurrency,
    translateLanguageToFullname,
} from '../../utils/localTranslation';
import { numberConverter } from '../../utils/numberConverter';
import { Button } from '../Button/Button';
import { Rating } from '../Rating/Rating';

interface MovieProps {
    isRandom: boolean;
}

export const MovieCard: FC<MovieProps> = ({ isRandom }) => {
    const dispatch = useAppDispatch();

    let { movieId } = useParams();

    if (!movieId) movieId = 'random';

    const { data } = useMovie({ query: movieId });

    const favoriteState = useAppSelector(
        (state) => state.fetchMe.user?.favorites,
    );

    const isFavorites = favoriteState?.some((elem) => Number(elem) === data.id);

    useEffect(() => {
        dispatch(changeVideoId(data.trailerYouTubeId));
    }, [data.id]);

    const showTrailerHandler = () => {
        dispatch(openModal());
        dispatch(toggleState('video'));
    };

    const formatedRuntime = numberConverter(data.runtime);

    const navigate = useNavigate();

    const refreshRandomMovie = () => {
        queryClient.invalidateQueries({ queryKey: ['movie'] });
    };

    const { mutateFavorite, removeFavorite } = useFavorites();

    const addFavorite = () => {
        dispatch(toggleState('login'));
        mutateFavorite(data.id.toString());
    };

    return (
        <div className="movie">
            <div className="movie__content content">
                <div className="content__top">
                    <Rating
                        isSmall={false}
                        className="content__rating"
                        rating={data.tmdbRating}
                    />
                    <div className="content__year">{data.releaseYear}</div>
                    <div className="content__genres">{data.genres[0]}</div>
                    <div className="content__runtime">{formatedRuntime}</div>
                </div>
                <div className="content__middle">
                    <h1 className="content__title">{data.title}</h1>
                    <p className="content__description">{data.plot}</p>
                </div>
                <div className="content__bottom">
                    <Button
                        children="Трейлер"
                        onClick={showTrailerHandler}
                        title="trailer"
                        kind="primary"
                        className="content__btn btn--text"
                    />
                    {isRandom && (
                        <Button
                            children="О фильме"
                            onClick={() => {
                                navigate(`/movie/${data.id}`);
                            }}
                            title="about"
                            kind="secondary"
                            className="content__btn btn--text"
                        />
                    )}
                    <Button
                        children={isFavorites ? <FavoriteIcon /> : <LikeIcon />}
                        onClick={
                            isFavorites
                                ? () => removeFavorite(data.id.toString())
                                : addFavorite
                        }
                        title="like"
                        kind="secondary"
                        className="content__btn btn--icon"
                    />
                    {isRandom && (
                        <Button
                            children={<RefreshIcon />}
                            onClick={() => refreshRandomMovie()}
                            title="refresh"
                            kind="secondary"
                            className="content__btn btn--icon"
                        />
                    )}
                </div>
            </div>
            <img
                src={data.backdropUrl ? data.backdropUrl : imageNotFound}
                alt="movie-poster"
                className="movie__img"
            />
            {!isRandom && (
                <div className="movie__details details">
                    <h3 className="details__header">О фильме</h3>
                    <div className="detals__table table">
                        <span className="table__row">
                            <div className="table__wrapper">
                                <p className="table__head">Язык оригинала</p>
                                <span className="table__bullets"></span>
                            </div>
                            <p className="table__content">
                                {translateLanguageToFullname(data.language)}
                            </p>
                        </span>
                        <span className="table__row">
                            <div className="table__wrapper">
                                <p className="table__head">Бюджет</p>
                                <span className="table__bullets"></span>
                            </div>
                            <p className="table__content">
                                {translateCurrency(data.budget)}
                            </p>
                        </span>
                        <span className="table__row">
                            <div className="table__wrapper">
                                <p className="table__head">Выручка</p>
                                <span className="table__bullets"></span>
                            </div>
                            <p className="table__content">
                                {translateCurrency(data.revenue)}
                            </p>
                        </span>
                        <span className="table__row">
                            <div className="table__wrapper">
                                <p className="table__head">Режиссер</p>
                                <span className="table__bullets"></span>
                            </div>
                            <p className="table__content">
                                {data.director ? data.director : 'Неизвестно'}
                            </p>
                        </span>
                        <span className="table__row">
                            <div className="table__wrapper">
                                <p className="table__head">Продакшен</p>
                                <span className="table__bullets"></span>
                            </div>
                            <p className="table__content">
                                {data.production
                                    ? data.production
                                    : 'Неизвестно'}
                            </p>
                        </span>
                        <span className="table__row">
                            <div className="table__wrapper">
                                <p className="table__head">Награды</p>
                                <span className="table__bullets"></span>
                            </div>
                            <p className="table__content">
                                {data.awardsSummary
                                    ? data.awardsSummary
                                    : 'Неизвестно'}
                            </p>
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};
