import { FC, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorFallback } from '../../components/ErrorFallback/ErrorFallback';
import { GenresList } from '../../components/GenresList/GenresList';
import { Loader } from '../../components/Loader';
import { useGenresList } from '../../hooks/useGenresList';

export const GenresPage: FC = () => {
    const { data } = useGenresList();

    return (
        <ErrorBoundary fallbackRender={ErrorFallback}>
            <Suspense fallback={<Loader />}>
                <GenresList queryResp={data} />
            </Suspense>
        </ErrorBoundary>
    );
};
