import { FC, Suspense } from "react";
import { GenresList } from "../../components/GenresList/GenresList";
import { useGenresList } from "../../hooks/useGenresList";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../../components/ErrorFallback/ErrorFallback";
import { Loader } from "../../components/Loader";

export const GenresPage: FC = () => {

  const { data } = useGenresList()

  return (
    <ErrorBoundary fallbackRender={
      ErrorFallback
    }>
      <Suspense fallback={<Loader />}>
        <GenresList queryResp={data} />
      </Suspense>
    </ErrorBoundary>
  )
}