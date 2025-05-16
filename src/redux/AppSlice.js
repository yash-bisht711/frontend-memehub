import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // Add your initial state properties here
    isLoading: false,
    error: null,
    // Example: user: null,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.isLoading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        clearError(state) {
            state.error = null;
        },
        // Add more reducers as needed
    },
});

export const { setLoading, setError, clearError } = appSlice.actions;
export default appSlice.reducer;