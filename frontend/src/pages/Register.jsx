import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

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
    <main>
      <h1>Create Account</h1>

      <form onSubmit={handleSubmit}>
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

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </main>
  );
}
