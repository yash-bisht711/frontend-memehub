import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FeedPage from "./Pages/FeedPage";
import CreateMemePage from "./Pages/CreateMemePage";
import DashboardPage from "./Pages/DashboardPage";
import MemeDetailPage from "./Pages/MemeDetailPage";
import Navigation from "./components/Navbar";
import PrivateRoute from "../src/components/PrivateRoutes";
import "./App.css";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignUpPage";
import TopPage from "./Pages/TopPage";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getPosts } from "./redux/AppSlice";

function App() {
  const { posts } = useSelector(state => state.app)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPosts())
    dispatch(getAllUsers())
  }, [])

  useEffect(() => console.log(posts), [posts])

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<FeedPage />} />
        <Route path="/top/:time" element={<TopPage />} />
        <Route path="/Create" element={<PrivateRoute><CreateMemePage /></PrivateRoute>} />
        <Route path="/meme/:id" element={<MemeDetailPage />} />
        <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<h1 className="bg-surface-a0 text-center font-bold text-4xl mt-8">404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
