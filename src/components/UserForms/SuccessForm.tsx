import './style.scss';

import { FC } from 'react';

import logoBlackIcon from '/src/assets/img/logo-black.png';

import { useAppDispatch } from '../../app/hooks';
import { toggleAuthState } from '../../app/modalSlice';
import { Button } from '../Button/Button';

export const SuccessForm: FC = () => {
    const dispatch = useAppDispatch();

    return (
        <div className="login">
            <img src={logoBlackIcon} alt="Logo" className="login__logo" />
            <h2 className="login__header">Регистрация завершена</h2>
            <p className="login__text">
                Используйте вашу электронную почту для входа
            </p>
            <Button
                children="Войти"
                title="logIn"
                className="login__btn"
                kind="primary"
                onClick={() => dispatch(toggleAuthState('autorisation'))}
            ></Button>
        </div>
    );
};
