import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/Homepage";
import AdminDashboard from "./pages/AdminDashboard";
import NotFoundPage from "./pages/404";
import Login from "./components/Login";
import useAdmin from "../hooks/useAdmin";

function App() {
  const { isAdmin, loading } = useAdmin();
  console.log("Is Admin:", isAdmin);

  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* Protect the admin route */}
        <Route
          path="/admin"
          element={
            isAdmin ? <AdminDashboard /> : <Navigate to="/login" />
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
