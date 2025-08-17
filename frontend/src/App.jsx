import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/:companyDomain/register" element={<RegisterPage />} />
        <Route path="/register" element={<RegisterPage />} /> {/* For new company registration */}
        <Route path="/profile" element={<ProfilePage />} />
        {/* Optional: Add a fallback route */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;