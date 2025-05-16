import { configureStore } from '@reduxjs/toolkit';
import AppReducer from './AppSlice'

const store = configureStore({
    reducer: {
        // user: userReducer,
        // Add your reducers here
        app: AppReducer,
    },
});

export default store;