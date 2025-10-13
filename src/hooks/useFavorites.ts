import { useMutation } from '@tanstack/react-query';

import { delFavorite, sendFavorite } from '../api/Movie';
import { queryClient } from '../api/QueryClient';
import { fetchCurrentUser } from '../app/fetchMeSlice';
import { useAppDispatch } from '../app/hooks';
import { openModal } from '../app/modalSlice';

export const useFavorites = () => {
    const dispatch = useAppDispatch();

    const { mutate: mutateFavorite } = useMutation(
        {
            mutationFn: sendFavorite,
            onError(error) {
                if (error?.message === 'Please, log in') dispatch(openModal());
            },
            onSuccess() {
                dispatch(fetchCurrentUser());
            },
        },
        queryClient,
    );

    const { mutate: removeFavorite } = useMutation(
        {
            mutationFn: delFavorite,
            onSuccess() {
                dispatch(fetchCurrentUser());
                queryClient.invalidateQueries({
                    queryKey: ['movieList', 'favorites', undefined],
                });
            },
        },
        queryClient,
    );

    return { mutateFavorite, removeFavorite };
};
