import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./Register.css";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await api.post("/users/register", formData);
      setMessage(response.data.message);
      setFormData({
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    }
  }

  return (
  <main className="login-page">

    <div className="bg-icon icon-1">📁</div>
    <div className="bg-icon icon-2">📋</div>
    <div className="bg-icon icon-3">📊</div>
    <div className="bg-icon icon-4">✅</div>
    <div className="bg-icon icon-5">📅</div>
    <div className="bg-icon icon-6">🎯</div>
    <div className="bg-icon icon-7">📁</div>
    <div className="bg-icon icon-8">📋</div>

    <div className="feature-panel">
      <h1>
        Stay Organized.
        <br />
        Stay Focused.
        <br />
        <span>Get Things Done.</span>
      </h1>

      <p>
        Pro-Tasker helps you manage projects, track progress,
        and achieve more every day.
      </p>

      <div className="feature-item">
        📁 Organize Projects
      </div>

      <div className="feature-item">
        ✅ Track Task Progress
      </div>

      <div className="feature-item">
        📅 Manage Due Dates
      </div>

      <div className="feature-item">
        📊 Visualize Success
      </div>

      <div className="floating-graphic">
        📋
      </div>
    </div>

    <div className="login-card">
      <h1>Create Account</h1>
      <p className="login-subtitle">
        Sign up to start managing projects and tasks.
      </p>

      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Username
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Register</button>
      </form>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}

      <p className="register-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  </main>
);
}