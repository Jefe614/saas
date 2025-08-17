import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Form, Input, Button, Card } from "antd";

function LoginPage() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const res = await api.post("accounts/login/", values);
      localStorage.setItem("token", res.data.token);
      navigate("/profile");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <Card className="w-96 shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item name="username" label="Username" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default LoginPage;
