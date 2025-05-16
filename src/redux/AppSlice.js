import { createSlice } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    // Add your initial state properties here
    isLoading: false,
    error: null,
    user: null,
};

// Async thunk for Firebase login
export const loginWithFirebase = createAsyncThunk(
    'app/loginWithFirebase',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const signUpWithFirebase = createAsyncThunk(
    'app/signUpWithFirebase',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const { createUserWithEmailAndPassword } = await import("firebase/auth");
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const checkUserLoggedIn = createAsyncThunk(
    'app/checkUserLoggedIn',
    async (_, { rejectWithValue }) => {
        try {
            return new Promise((resolve) => {
                auth.onAuthStateChanged((user) => {
                    resolve(user || null);
                });
            });
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


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
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginWithFirebase.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginWithFirebase.fulfilled, (state, action) => {
                state.isLoading = false;
                // Example: state.user = action.payload;
            })
            .addCase(loginWithFirebase.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

        builder
            .addCase(signUpWithFirebase.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(signUpWithFirebase.fulfilled, (state, action) => {
                state.isLoading = false;
                // Example: state.user = action.payload;
            })
            .addCase(signUpWithFirebase.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

        builder
            .addCase(checkUserLoggedIn.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(checkUserLoggedIn.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(checkUserLoggedIn.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.user = null;
            });

    }
});

export const { setLoading, setError, clearError } = appSlice.actions;
export default appSlice.reducer;