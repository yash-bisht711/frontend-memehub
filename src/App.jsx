import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FeedPage from "./Pages/FeedPage";
import CreateMemePage from "./Pages/CreateMemePage";
import DashboardPage from "./Pages/DashboardPage";
import MemeDetailPage from "./Pages/MemeDetailPage";
import Navigation from "./components/Navbar";
import LoginForm from "./components/Login";
import SignupForm from "./components/SignUp";
import ResetPassword from "./components/ResetPassword";
import ProfilePage from "./components/ProfilePage";
import PrivateRoute from "./components/PrivateRoute";
import './App.css';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<FeedPage />} />
        <Route path="/create" element={<PrivateRoute><CreateMemePage /></PrivateRoute>} />
        <Route path="/meme/:id" element={<MemeDetailPage />} />
        <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<h1 className="text-center text-2xl mt-8">404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
