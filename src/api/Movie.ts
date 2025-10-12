import { z } from 'zod';

import { fetchResValid } from './FetchResValid';

const MovieSchema = z.object({
    id: z.number(),
    title: z.string(),
    originalTitle: z.string(),
    language: z.string(),
    releaseYear: z.union([z.null(), z.number()]),
    releaseDate: z.union([z.null(), z.string()]),
    genres: z.string().array(),
    plot: z.string(),
    runtime: z.number(),
    budget: z.union([z.null(), z.string()]),
    revenue: z.union([z.null(), z.string()]),
    homepage: z.string(),
    status: z.string(),
    posterUrl: z.union([z.string(), z.null()]),
    backdropUrl: z.union([z.string(), z.null()]),
    trailerUrl: z.string(),
    trailerYouTubeId: z.string(),
    tmdbRating: z.number(),
    searchL: z.string(),
    keywords: z.string().array(),
    countriesOfOrigin: z.string().array(),
    languages: z.string().array(),
    cast: z.string().array(),
    director: z.union([z.null(), z.string()]),
    production: z.union([z.null(), z.string()]),
    awardsSummary: z.union([z.null(), z.string()]),
});

export type Movie = z.infer<typeof MovieSchema>;

const MoviesListSchema = z.array(MovieSchema);

export type MoviesList = z.infer<typeof MoviesListSchema>;

export function fetchMovie(query: string): Promise<Movie> {
    return fetch(`https://cinemaguide.skillbox.cc/movie/${query}`)
        .then(fetchResValid)
        .then((res) => res.json())
        .then((data) => MovieSchema.parse(data));
}

export function fetchMovieList(url: URL): Promise<MoviesList> {
    return fetch(url, {
        credentials: 'include',
    })
        .then(fetchResValid)
        .then((res) => res.json())
        .then((data) => MoviesListSchema.parse(data));
}

export function sendFavorite(id: string): Promise<void> {
    return fetch('https://cinemaguide.skillbox.cc/favorites', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
    })
        .then(fetchResValid)
        .then((res) => res.json())
        .then(() => undefined);
}

export function delFavorite(id: string): Promise<void> {
    return fetch(`https://cinemaguide.skillbox.cc/favorites/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(fetchResValid)
        .then((res) => res.json())
        .then(() => undefined);
}
