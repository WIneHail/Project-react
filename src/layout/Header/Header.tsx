import './style.scss';

import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Link, useNavigate } from 'react-router-dom';

import logoIcon from '/src/assets/img/logo.png';
import IconClose from '/src/assets/img/UI/close.svg?react';
import GenresIcon from '/src/assets/img/UI/genres.svg?react';
import SearchMobIcon from '/src/assets/img/UI/search-mob.svg?react';
import UsersIcon from '/src/assets/img/UI/user.svg?react';

import { fetchCurrentUser } from '../../app/fetchMeSlice.ts';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { closeModal, openModal, toggleState } from '../../app/modalSlice.ts';
import { changeValue } from '../../app/searchSlice.ts';
import { Button } from '../../components/Button/Button.tsx';
import { DropDownList } from '../../components/DropDownList/DropDownList.tsx';
import { InputField } from '../../components/InputField/InputField.tsx';
import { Loader } from '../../components/Loader/index.ts';
import { LoginForm } from '../../components/UserForms/LoginForm.tsx';
import { RegisterForm } from '../../components/UserForms/RegisterForm.tsx';
import { SuccessForm } from '../../components/UserForms/SuccessForm.tsx';
import { VideoPlayer } from '../../components/VideoPlayer/VideoPlayer.tsx';
import { useDebounce } from '../../hooks/useDebounce.ts';
import { useWindowWidth } from '../../hooks/useScreenWidth.ts';
import { useSearchListByTitle } from '../../hooks/useSearchListByTitle.ts';

Modal.setAppElement('#root');

export const Header: FC = () => {
    const dispatch = useAppDispatch();

    const modalState = useAppSelector((state) => state.modal.open);

    const inputValue = useAppSelector((state) => state.search.value);

    const bedouncingValue = useDebounce(inputValue, 500);

    const searchQuery = useSearchListByTitle(bedouncingValue);

    const authState = useAppSelector((state) => state.modal.authState);

    const modalContext = useAppSelector((state) => state.modal.context);

    const user = useAppSelector((state) => state.fetchMe.user);

    const videoId = useAppSelector((state) => state.modal.videoId);

    const [dropDownState, setDropDownState] = useState(false);

    useEffect(() => {
        dispatch(fetchCurrentUser());
    }, [user?.email]);

    const navigate = useNavigate();

    const onClickNavigate = useCallback(() => {
        navigate('/', { replace: true });
    }, []);

    const root = document.querySelector('html');

    const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.currentTarget.value;
        if (root) {
            root.style.overflowY = 'hidden';
        }
        dispatch(changeValue(input));
        input ? setDropDownState(true) : setDropDownState(false);
    };

    const searchFieldToggle = () => {
        dispatch(toggleState('dropdown'));
        dispatch(openModal());
    };

    const onOpenLogin = () => {
        dispatch(toggleState('login'));
        dispatch(openModal());
    };

    const onCloseModal = () => {
        setDropDownState(false);
        dispatch(changeValue(''));
        if (root) {
            root.style.overflowY = 'auto';
        }
        dispatch(closeModal());
    };

    const screenSize = useWindowWidth();

    return (
        <header className="header">
            <Link className="header__logo" to="/">
                <img src={logoIcon} alt="Logo" />
            </Link>
            <nav className="header__nav nav">
                <ul className="nav__list">
                    <li
                        className="nav__item"
                        style={{
                            display: screenSize < 1000 ? 'none' : 'block',
                        }}
                    >
                        <Link className="nav__link" to="/">
                            Главная
                        </Link>
                    </li>
                    <li className="nav__item">
                        <Link className="nav__link" to="/genres">
                            {screenSize < 1000 ? (
                                <GenresIcon className="nav__link--mobile" />
                            ) : (
                                'Жанры'
                            )}
                        </Link>
                    </li>
                </ul>
                <InputField
                    imgChild={
                        <button
                            children={
                                searchQuery.isPending && inputValue !== '' ? (
                                    <Loader />
                                ) : (
                                    <SearchMobIcon />
                                )
                            }
                            title="search"
                            onClick={searchFieldToggle}
                            className="header__badge"
                            disabled={screenSize < 1000 ? false : true}
                        ></button>
                    }
                    child={
                        <input
                            name="search"
                            className="header__input input__field"
                            placeholder="Поиск"
                            type="text"
                            value={
                                searchQuery.isError
                                    ? searchQuery.error?.message
                                    : inputValue
                            }
                            onChange={(e) => searchHandler(e)}
                        />
                    }
                    dropdown={
                        screenSize > 1000 && (
                            <DropDownList
                                isActive={dropDownState}
                                movieList={searchQuery.data}
                                setDropDownState={setDropDownState}
                            />
                        )
                    }
                    btn={
                        <Button
                            className={
                                inputValue !== ''
                                    ? 'header__btn btn--close active'
                                    : 'header__btn btn--close'
                            }
                            kind="round"
                            children={<IconClose />}
                            onClick={onCloseModal}
                        />
                    }
                ></InputField>
                {user ? (
                    <Link
                        to="/account"
                        className="header__link"
                        children={user.name}
                        onClick={onClickNavigate}
                    ></Link>
                ) : (
                    <Button
                        children={screenSize < 1000 ? <UsersIcon /> : 'Войти'}
                        title="logIn"
                        className="header__btn"
                        kind="secondary"
                        onClick={onOpenLogin}
                    ></Button>
                )}
            </nav>
            <Modal
                closeTimeoutMS={200}
                className="modal-body"
                overlayClassName={`modal-overlay ${modalContext}`}
                isOpen={modalState}
                onRequestClose={onCloseModal}
                shouldFocusAfterRender={false}
            >
                <Button
                    className="modal-close"
                    kind="round"
                    children={<IconClose />}
                    onClick={onCloseModal}
                />
                {(modalContext === 'dropdown' && screenSize < 1000 && (
                    <InputField
                        imgChild={
                            <div className="header__badge">
                                {searchQuery.isPending && inputValue !== '' ? (
                                    <Loader />
                                ) : (
                                    <SearchMobIcon />
                                )}
                            </div>
                        }
                        child={
                            <input
                                name="search"
                                className="header__input input__field"
                                placeholder="Поиск"
                                type="text"
                                value={
                                    searchQuery.isError
                                        ? searchQuery.error?.message
                                        : inputValue
                                }
                                onChange={(e) => searchHandler(e)}
                            />
                        }
                        dropdown={
                            <DropDownList
                                isActive={dropDownState}
                                movieList={searchQuery.data}
                                setDropDownState={setDropDownState}
                            />
                        }
                    ></InputField>
                )) ||
                    (modalContext === 'login' && (
                        <>
                            {(authState === 'autorisation' && <LoginForm />) ||
                                (authState === 'register' && (
                                    <RegisterForm />
                                )) ||
                                (authState === 'success' && <SuccessForm />)}
                        </>
                    )) ||
                    (modalContext === 'video' && (
                        <VideoPlayer videoId={videoId} />
                    ))}
            </Modal>
        </header>
    );
};
