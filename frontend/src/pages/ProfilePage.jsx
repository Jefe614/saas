import React from "react";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { Card, Button } from "antd";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("accounts/profile/", {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
        });
        setUser(res.data);
      } catch {
        navigate("/login");
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <Card className="w-96 shadow-lg">
        {user ? (
          <>
            <h1 className="text-xl font-bold mb-2">Hello, {user.username}</h1>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <Button type="primary" danger onClick={handleLogout} block>
              Logout
            </Button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </Card>
    </div>
  );
}

export default ProfilePage;
