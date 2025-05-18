// redux/appSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerUser } from '../firebase/firebaseUtils';
import { auth } from '../firebase/firebase';
import { signOut } from 'firebase/auth';
import axios from 'axios';

const initialState = {
  isLoading: false,
  error: null,
  user: null,
  isSessionChecked: false,
  search: '',
  posts: [],
  allUserDetails: {},
};

const getFriendlyError = (error) => {
  switch (error.code) {
    case 'auth/user-not-found': return 'No user found with this email.';
    case 'auth/wrong-password': return 'Incorrect password.';
    case 'auth/email-already-in-use': return 'Email is already in use.';
    case 'auth/weak-password': return 'Password should be at least 6 characters.';
    default: return error.message;
  }
};

export const loginWithFirebase = createAsyncThunk(
  'app/loginWithFirebase',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential.user.email)
      return userCredential.user.email;
    } catch (error) {
      return rejectWithValue(getFriendlyError(error));
    }
  }
);

export const signUpWithFirebase = createAsyncThunk(
  'app/signUpWithFirebase',
  async ({ email, password, name, profilePicture }, { rejectWithValue }) => {
    try {
      const user = await registerUser(email, password, name, profilePicture);
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
    } catch (error) {
      return rejectWithValue(getFriendlyError(error));
    }
  }
);

export const checkUserLoggedIn = createAsyncThunk(
  'app/checkUserLoggedIn',
  async (_, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;
      return user ? {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      } : null;
    } catch (error) {
      return rejectWithValue(getFriendlyError(error));
    }
  }
);

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

export const getPosts = createAsyncThunk(
  'app/getPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://backend-memehub-production.up.railway.app/api/posts/');
      const data = response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch posts');
    }
  }
)

export const getAllUsers = createAsyncThunk(
  'app/getAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://backend-memehub-production.up.railway.app/api/users/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch users');
    }
  }
)

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    searchPost(state, action) {
      state.search = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
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
      .addCase(checkUserLoggedIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isSessionChecked = true;
      })
      .addCase(checkUserLoggedIn.rejected, (state, action) => {
        state.user = null;
        state.error = action.payload;
        state.isSessionChecked = false;
      })
      .addCase(logoutFirebase.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
      })
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        // Transform array of users to object with email as key
        state.allUserDetails = Array.isArray(action.payload)
          ? action.payload.reduce((acc, user) => {
              const { email, ...rest } = user;
              if (email) acc[email] = rest;
              return acc;
            }, {})
          : {};
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  },
});

export const { clearError, searchPost } = appSlice.actions;
export default appSlice.reducer;