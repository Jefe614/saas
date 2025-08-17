import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function RegisterPage() {
  const { companyDomain } = useParams(); // /:companyDomain/register or /register
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    company_name: companyDomain ? "" : "", // Only for admin creating new company
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
    if (!formData.username || !formData.email || !formData.password) {
      setError("Username, email, and password are required.");
      return;
    }

    let payload = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    if (companyDomain) {
      // Customer registering under existing company
      if (!companyDomain) {
        setError("Company domain is required.");
        return;
      }
      payload.company_domain = companyDomain;
    } else {
      // Admin creating new company
      if (!formData.company_name) {
        setError("Company name is required to create a new company.");
        return;
      }
      payload.company_name = formData.company_name;
    }

    try {
      const res = await api.post("accounts/register/", payload); // Use api instance
      alert("Registered successfully!");
      console.log(res.data);
      // Redirect or clear form on success (e.g., to login page)
      setFormData({ username: "", email: "", password: "", company_name: "" });
    } catch (err) {
      console.error(err.response?.data);
      setError(err.response?.data?.error || "Error registering user");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md transform transition-all duration-300 hover:shadow-3xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {companyDomain ? `Join ${companyDomain}` : "Create Your Company"}
        </h2>

        {error && (
          <div className="mb-4 text-red-500 text-center bg-red-50 p-2 rounded-lg">
            {error}
          </div>
        )}

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

        <div className="mb-6">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
          />
        </div>

        {!companyDomain && (
          <div className="mb-6">
            <input
              type="text"
              name="company_name"
              placeholder="Company Name"
              value={formData.company_name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
        >
          {companyDomain ? "Register" : "Create Company"}
        </button>
      </form>
    </div>
  );
}