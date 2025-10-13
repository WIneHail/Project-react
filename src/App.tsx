import { FC, memo } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useAppSelector } from './app/hooks';
import { MovieCard } from './components/MovieCard/MovieCard';
import { MovieListWithSearch } from './components/MovieList/MovieListWithSearch';
import { AccountPage } from './layout/AccountPage/AccountPage';
import { Footer } from './layout/Footer/Footer';
import { GenresPage } from './layout/GenresPage/GenresPage';
import { Header } from './layout/Header/Header';
import { MainPage } from './layout/MainPage/MainPage';

export const App: FC = () => {
    const user = useAppSelector((state) => state.fetchMe.user);

    const MemoHeader = memo(Header);

    return (
        <>
            <MemoHeader />
            <main>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/genres" element={<GenresPage />} />
                    <Route path="/movie" element={<MovieListWithSearch />} />
                    <Route
                        path="/movie/:movieId"
                        element={<MovieCard isRandom={false} />}
                    />
                    <Route
                        path="/account"
                        element={user ? <AccountPage /> : <MainPage />}
                    />
                </Routes>
            </main>
            <Footer />
        </>
    );
};
