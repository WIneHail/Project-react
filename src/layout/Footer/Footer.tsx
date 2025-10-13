import './style.scss';

import { FC } from 'react';

import OKIcon from '/src/assets/img/socials/ok.svg?react';
import TGIcon from '/src/assets/img/socials/telegram.svg?react';
import VKIcon from '/src/assets/img/socials/vk.svg?react';
import YTIcon from '/src/assets/img/socials/youtube.svg?react';

export const Footer: FC = () => {
    return (
        <footer>
            <ul className="socials">
                <li className="socials__item">
                    <a href="https://vk.com" className="socials__link">
                        <VKIcon />
                    </a>
                </li>
                <li className="socials__item">
                    <a href="https://www.youtube.com" className="socials__link">
                        <YTIcon />
                    </a>
                </li>
                <li className="socials__item">
                    <a href="https://ok.ru" className="socials__link">
                        <OKIcon />
                    </a>
                </li>
                <li className="socials__item">
                    <a href="https://telegram.org" className="socials__link">
                        <TGIcon />
                    </a>
                </li>
            </ul>
        </footer>
    );
};
