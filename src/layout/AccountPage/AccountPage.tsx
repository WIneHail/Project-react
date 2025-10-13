import './style.scss';

import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import LikeIcon from '/src/assets/img/UI/like.svg?react';
import IconMail from '/src/assets/img/UI/mail.svg?react';
import ProfileIcon from '/src/assets/img/UI/user.svg?react';

import { logOut } from '../../api/User';
import { resetUser } from '../../app/fetchMeSlice';
import { useAppSelector } from '../../app/hooks';
import { Button } from '../../components/Button/Button';
import { MovieList } from '../../components/MovieList/MovieList';
import { useWindowWidth } from '../../hooks/useScreenWidth';

export const AccountPage: FC = () => {
    const user = useAppSelector((state) => state.fetchMe.user);

    const [accountState, setAccountState] = useState<'favorites' | 'settings'>(
        'favorites',
    );

    const initials = user
        ? user?.name.charAt(0).toUpperCase() +
          user?.surname.charAt(0).toUpperCase()
        : 'Nan';

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const screenWidth = useWindowWidth();

    const exitOnClick = () => {
        try {
            logOut();
        } catch {
            throw new Error('Error ocurred< try again later');
        } finally {
            navigate('/');
            dispatch(resetUser());
        }
    };

    return (
        <>
            <h1 className="account__header">Мой аккаунт</h1>
            <ul className="account__menu">
                <li className="account__item">
                    <Button
                        className={
                            accountState === 'favorites'
                                ? 'account__btn active'
                                : 'account__btn'
                        }
                        kind="linklike"
                        onClick={() => setAccountState('favorites')}
                    >
                        <LikeIcon style={{ marginRight: 10 }} />
                        {screenWidth < 1000 ? 'Избранное' : 'Избранные фильмы'}
                    </Button>
                </li>
                <li className="account__item">
                    <Button
                        className={
                            accountState === 'settings'
                                ? 'account__btn active'
                                : 'account__btn'
                        }
                        kind="linklike"
                        onClick={() => setAccountState('settings')}
                    >
                        <ProfileIcon style={{ marginRight: 10 }} />
                        {screenWidth < 1000
                            ? 'Настройки'
                            : 'Настройки аккаунта'}
                    </Button>
                </li>
            </ul>
            {accountState === 'favorites' ? (
                <MovieList
                    query={'favorites'}
                    isTopTen={false}
                    canBeDelete={true}
                />
            ) : (
                <div className="account__info info">
                    <div className="info__context">
                        <div className="info__badge">
                            <p className="info__initials">{initials}</p>
                        </div>
                        <div className="info__wrapper">
                            <p className="info__head">Имя Фамилия</p>
                            <p className="info__text">
                                {`${user?.name} ${user?.surname}`}
                            </p>
                        </div>
                    </div>
                    <div className="info__context">
                        <div className="info__badge">
                            <IconMail />
                        </div>
                        <div className="info__wrapper">
                            <p className="info__head">Электронная почта</p>
                            <p className="info__text">{user?.email}</p>
                        </div>
                    </div>
                    <Button
                        className="info__btn"
                        kind="primary"
                        onClick={() => {
                            exitOnClick();
                        }}
                    >
                        Выйти из аккаунта
                    </Button>
                </div>
            )}
        </>
    );
};
