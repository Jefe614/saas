import { useState } from "react";
import api from "../api/axios";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "", // Changed from company_name to name
    subdomain: "", // Added required subdomain field
    username: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "admin", // Default to admin for company registration
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.subdomain || !formData.username || !formData.email || !formData.password) {
      setError("Company name, subdomain, username, email, and password are required.");
      return;
    }

    // Validate subdomain format (lowercase letters, numbers, hyphens only)
    const subdomainRegex = /^[a-z0-9-]+$/;
    if (!subdomainRegex.test(formData.subdomain)) {
      setError("Subdomain must contain only lowercase letters, numbers, and hyphens.");
      return;
    }

    // Validate password length
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    const payload = {
      name: formData.name, // Changed from company_name
      subdomain: formData.subdomain, // Added subdomain
      username: formData.username,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      address: formData.address,
      role: formData.role,
    };

    try {
      // Updated URL to match your API endpoint
      const res = await api.post("/api/companies/", payload);
      alert("Company registered successfully!");
      console.log(res.data);
      // Redirect to login page or clear form
      setFormData({
        name: "",
        subdomain: "",
        username: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        role: "admin",
      });
    } catch (err) {
      console.error(err.response?.data);
      setError(err.response?.data?.error || "Error registering company");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md transform transition-all duration-300 hover:shadow-3xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create Your Company
        </h2>

        {error && (
          <div className="mb-4 text-red-500 text-center bg-red-50 p-2 rounded-lg">
            {error}
          </div>
        )}

        <div className="mb-4">
          <input
            type="text"
            name="name"
            placeholder="Company Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="subdomain"
            placeholder="Subdomain (e.g., mycompany)"
            value={formData.subdomain}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
          />
          <p className="text-xs text-gray-500 mt-1">
            Only lowercase letters, numbers, and hyphens allowed
          </p>
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
          />
        </div>

        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Password (min 8 characters)"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="phone"
            placeholder="Phone (optional)"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
          />
        </div>

        <div className="mb-6">
          <input
            type="text"
            name="address"
            placeholder="Address (optional)"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
          />
        </div>

        {/* Optional: Include role selection if you want flexibility */}
        {/* <div className="mb-6">
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
          >
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
          </select>
        </div> */}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
        >
          Create Company
        </button>
      </form>
    </div>
  );
}