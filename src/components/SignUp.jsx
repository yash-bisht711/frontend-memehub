// SignupForm.jsx

import React, { useState } from 'react';          // 1. Import React
import { createUserWithEmailAndPassword } from 'firebase/auth';  // 2. Firebase Signup
import { useNavigate } from 'react-router-dom';  // 4. Redirect After Signup
import { auth } from '../firebase/firebase';

const SignupForm = () => {
  // 5. State Handling
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 6. Handle Form Submission
  const handleSignup = async (e) => {
    e.preventDefault(); // prevent page reload
    setError('');

    try {
      await createUserWithEmailAndPassword(auth, email, password); // Firebase signup
      navigate('/login'); // go to login page
    } catch (err) {
      setError(err.message); // display Firebase error
    }
  };

  // 7. JSX (UI)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSignup} className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center">Sign Up</h2>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter email"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter password"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
