import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FeedPage from "./Pages/FeedPage";
import CreateMemePage from "./Pages/CreateMemePage";
import DashboardPage from "./Pages/DashboardPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import Navigation from "./components/Navbar";
import MemeDetailPage from "./Pages/MemeDetailPage";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<FeedPage />} />
        <Route path="/create" element={<CreateMemePage />} />
        <Route path="/meme/:id" element={<MemeDetailPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
