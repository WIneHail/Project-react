import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface AuthProps {
    context: 'login' | 'search' | 'dropdown' | 'video';
    authState: 'register' | 'autorisation' | 'success';
    open: boolean;
    videoId: string;
}

// If you are not using async thunks you can use the standalone `createSlice`.
const modalSlice = createSlice({
    name: 'modal',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState: {
        context: 'login',
        authState: 'autorisation',
        open: false,
        videoId: '',
    } as AuthProps,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        toggleState: (state, action: PayloadAction<AuthProps['context']>) => {
            state.context = action.payload;
        },
        toggleAuthState: (
            state,
            action: PayloadAction<AuthProps['authState']>,
        ) => {
            state.authState = action.payload;
        },
        openModal: (state) => {
            state.open = true;
        },
        closeModal: (state) => {
            state.open = false;
        },
        changeVideoId: (state, action: PayloadAction<AuthProps['videoId']>) => {
            state.videoId = action.payload;
        },
    },
});

export const {
    toggleState,
    toggleAuthState,
    openModal,
    closeModal,
    changeVideoId,
} = modalSlice.actions;

export default modalSlice;
