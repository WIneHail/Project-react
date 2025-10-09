import { FC, memo } from "react"
import { MainPage } from "./layout/MainPage/MainPage";

import { Route, Routes } from "react-router-dom";
import { GenresPage } from "./layout/GenresPage/GenresPage";
import { AccountPage } from "./layout/AccountPage/AccountPage";
import { MovieListWithSearch } from "./components/MovieList/MovieListWithSearch";
import { MovieCard } from "./components/MovieCard/MovieCard";
import { useAppSelector } from "./app/hooks";
import { Header } from "./layout/Header/Header";
import { Footer } from "./layout/Footer/Footer";


export const App: FC = () => {

  const user = useAppSelector((state) => state.fetchMe.user)

  const MemoHeader = memo(Header)

  return (
    <>
      <MemoHeader />
      <main>
        <Routes>
          <Route path="/" element={
            <MainPage />
          } />
          <Route path="/genres" element={
            <GenresPage />
          } />
          <Route path="/movie" element={
            <MovieListWithSearch />
          } />
          <Route path="/movie/:movieId" element={
            <MovieCard isRandom={false} />
          } />
          <Route path="/account" element={
            user ?
              < AccountPage /> :
              <MainPage />
          } />
        </Routes>
      </main >
      <Footer />
    </>
  )
}

