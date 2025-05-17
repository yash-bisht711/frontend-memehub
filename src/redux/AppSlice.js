// redux/appSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from "../firebase/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";

const initialState = {
  isLoading: false,
  error: null,
  user: null,
  isSessionChecked: false,
};

// Helper function for friendly error messages
const getFriendlyError = (error) => {
  switch (error.code) {
    case 'auth/user-not-found':
      return 'No user found with this email.';
    case 'auth/wrong-password':
      return 'Incorrect password.';
    case 'auth/email-already-in-use':
      return 'Email is already in use.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.';
    default:
      return error.message;
  }
};

// Thunk to login user
export const loginWithFirebase = createAsyncThunk(
  'app/loginWithFirebase',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      return rejectWithValue(getFriendlyError(error));
    }
  }
);

// Thunk to sign up user
export const signUpWithFirebase = createAsyncThunk(
  'app/signUpWithFirebase',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      return rejectWithValue(getFriendlyError(error));
    }
  }
);

// Thunk to check if user is logged in (one-time check)
export const checkUserLoggedIn = createAsyncThunk(
  'app/checkUserLoggedIn',
  async (_, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;
      return user || null;
    } catch (error) {
      return rejectWithValue(getFriendlyError(error));
    }
  }
);

// Thunk to logout user
export const logoutFirebase = createAsyncThunk(
  'app/logoutFirebase',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return null;
    } catch (error) {
      return rejectWithValue(getFriendlyError(error));
    }
  }
);

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginWithFirebase.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginWithFirebase.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginWithFirebase.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Sign up
      .addCase(signUpWithFirebase.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUpWithFirebase.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(signUpWithFirebase.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Check logged-in user
      .addCase(checkUserLoggedIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkUserLoggedIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isSessionChecked = true;
      })
      .addCase(checkUserLoggedIn.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.error = action.payload;
        state.isSessionChecked = true;
      })

      // Logout
      .addCase(logoutFirebase.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutFirebase.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(logoutFirebase.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = appSlice.actions;
export default appSlice.reducer;
