import './Loader.css';

import { FC } from 'react';

export interface ILoaderProps {
    color?: 'blue' | 'white';
}

export const Loader: FC<ILoaderProps> = ({ color = 'white' }) => {
    return (
        <div className="loader" data-color={color}>
            <div className="loader__segment" />
            <div className="loader__segment" />
            <div className="loader__segment" />
        </div>
    );
};
