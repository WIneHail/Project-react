import './style.scss';

import { FC } from 'react';

import Star from '../../assets/img/UI/star.svg?react';
import StarSmall from '../../assets/img/UI/star-small.svg?react';
import { colorByRating } from '../../utils/colorByRating';
import { Props } from './props';

export const Rating: FC<Props> = ({ rating, className, isSmall }) => {
    const color = colorByRating(rating);
    return (
        <div
            className={`${className} rating`}
            style={{ backgroundColor: color }}
        >
            {isSmall ? <StarSmall /> : <Star />}

            {rating.toFixed(1)}
        </div>
    );
};
