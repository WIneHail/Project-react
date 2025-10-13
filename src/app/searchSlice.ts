import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface SearchProps {
    value: string;
}

// If you are not using async thunks you can use the standalone `createSlice`.
const searchSlice = createSlice({
    name: 'search',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState: { value: '' } as SearchProps,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        changeValue: (state, action: PayloadAction<SearchProps['value']>) => {
            state.value = action.payload;
        },
    },
});

export const { changeValue } = searchSlice.actions;

export default searchSlice;
