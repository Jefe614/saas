import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/Homepage";
import CategoriesPage from "./pages/CategoriesPage";
import AdminDashboard from "./pages/AdminDashboard";
import NotFoundPage from "./pages/404";

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categories/:categoryId" element={<CategoriesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/:companyDomain/register" element={<RegisterPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
