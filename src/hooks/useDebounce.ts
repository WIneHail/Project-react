import { useEffect, useState } from 'react';

export const useDebounce = (value: string, delay: number) => {
    const [debounceValue, debounceValueChange] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            debounceValueChange(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value]);

    return debounceValue;
};
