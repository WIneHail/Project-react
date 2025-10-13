import { FC } from 'react';

import { useGenresList } from '../../hooks/useGenresList';
import { Loader } from '../Loader';
import { GenresList } from './GenresList';

export const FetchGenresList: FC = () => {
    const genresList = useGenresList();

    if (genresList.isPending)
        return (
            <span
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '50vh',
                }}
            >
                <Loader />
            </span>
        );

    if (genresList.data) {
        if (genresList.isError) {
            return (
                <span
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        color: 'red',
                        alignItems: 'center',
                        height: '50vh',
                        margin: 'auto',
                    }}
                >{`Error occured: ${genresList.error?.message}`}</span>
            );
        } else {
            return <GenresList queryResp={genresList.data} />;
        }
    } else {
        return (
            <span
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    color: 'red',
                    alignItems: 'center',
                    height: '50vh',
                    margin: 'auto',
                }}
            >{`Error occured: ${genresList.error?.message}`}</span>
        );
    }
};
