import { FC, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorFallback } from '../../components/ErrorFallback/ErrorFallback';
import { Loader } from '../../components/Loader';
import { MovieCard } from '../../components/MovieCard/MovieCard';
import { MovieList } from '../../components/MovieList/MovieList';

export const MainPage: FC = () => {
    return (
        <>
            <ErrorBoundary fallbackRender={ErrorFallback}>
                <Suspense fallback={<Loader />}>
                    <MovieCard isRandom={true} />
                </Suspense>
            </ErrorBoundary>
            <ErrorBoundary fallbackRender={ErrorFallback}>
                <Suspense fallback={<Loader />}>
                    <MovieList
                        listTitle="Топ 10 фильмов"
                        query={'movie/top10'}
                        isTopTen={true}
                    />
                </Suspense>
            </ErrorBoundary>
        </>
    );
};
