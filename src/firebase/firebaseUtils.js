// firebase/firebaseUtils.js
import { auth } from './firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import axios from 'axios';

export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const registerUser = async (email, password, name, profilePicture) => {
  // 1. Create Firebase user
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // 2. Update display name
  await updateProfile(user, { displayName: name });

  // 3. Create FormData for API request
  const formData = new FormData();
  formData.append('email', email);
  formData.append('name', name);

  // 4. Generate handle (required)
  const handle = name?.toLowerCase().replace(/\s+/g, '') + Math.floor(Math.random() * 10000);
  formData.append('handle', handle);

  // 5. Append profile picture if available
  if (profilePicture) {
    formData.append('profile_picture', profilePicture);
  }

  // 6. Send data to your backend API
  try {
    const response = await axios.post(
      'https://backend-memehub-production.up.railway.app/api/users/',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    alert('User created successfully!');
    console.log(response.data);
  } catch (error) {
    alert('Failed to create user.');
    console.error(error.response?.data || error.message);
  }

  return user;
};
