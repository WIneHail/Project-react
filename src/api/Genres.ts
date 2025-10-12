import z from 'zod';

import { fetchResValid } from './FetchResValid';

export const genresTranslate = [
    { value: 'history', translate: 'Историческое' },
    { value: 'horror', translate: 'Ужасы' },
    { value: 'scifi', translate: 'Научная фантастика' },
    { value: 'stand-up', translate: 'Стенд-ап' },
    { value: 'fantasy', translate: 'Фэнтези' },
    { value: 'drama', translate: 'Драма' },
    { value: 'mystery', translate: 'Мистическое' },
    { value: 'family', translate: 'Семейное' },
    { value: 'comedy', translate: 'Комедия' },
    { value: 'romance', translate: 'Романтика' },
    { value: 'music', translate: 'Музыкальное' },
    { value: 'crime', translate: 'Криминальное' },
    { value: 'tv-movie', translate: 'ТВ-фильм' },
    { value: 'documentary', translate: 'Документальное' },
    { value: 'action', translate: 'Экшн' },
    { value: 'thriller', translate: 'Трилер' },
    { value: 'western', translate: 'Вестерн' },
    { value: 'animation', translate: 'Анимационное' },
    { value: 'war', translate: 'Военное' },
    { value: 'adventure', translate: 'Приключения' },
];

const GenresSchema = z.string().array();

export type Genres = z.infer<typeof GenresSchema>;

export function fetchGenresList(): Promise<Genres> {
    return fetch('https://cinemaguide.skillbox.cc/movie/genres', {
        method: 'GET',
        credentials: 'include',
    })
        .then(fetchResValid)
        .then((res) => res.json())
        .then((data) => GenresSchema.parse(data));
}
