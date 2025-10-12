import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

import { genresTranslate } from '../../api/Genres';
import { MovieList } from './MovieList';

export const MovieListWithSearch: FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const genre = genresTranslate.find(
        (elem) => elem.value === searchParams.get('genre'),
    );

    const currentCount = Number(searchParams.get('count'));

    const nextPageOnClick = () => {
        const nextCount = currentCount + 10;
        setSearchParams((searchParams) => {
            searchParams.set('count', nextCount.toString());
            return searchParams;
        });
    };
    return (
        <MovieList
            listTitle={genre?.translate}
            query={'movie'}
            searchParams={searchParams}
            isTopTen={false}
            nextPageHandler={nextPageOnClick}
        />
    );
};
