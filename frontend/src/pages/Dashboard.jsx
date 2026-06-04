import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  function handleLogout() {
  logout();
  navigate("/login");
  }
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await api.get("/projects");
        setProjects(response.data);
      } catch (error) {
        setError("Failed to load projects");
      }
    }

    fetchProjects();
  }, []);

  async function handleCreateProject(e) {
  e.preventDefault();

  try {
    const response = await api.post("/projects", {
      name,
      description,
    });

    setProjects([...projects, response.data]);

    setName("");
    setDescription("");
  } catch (error) {
    setError("Failed to create project");
  }
}

  return (
  <main>
    <h1>Welcome, {user?.username}!</h1>

    <button onClick={handleLogout}>
    Logout
    </button>

    <form onSubmit={handleCreateProject}>
      <h2>Create Project</h2>

      <input
        type="text"
        placeholder="Project Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <button type="submit">
        Create Project
      </button>
    </form>

    <h1>My Projects</h1>

      {error && <p>{error}</p>}

      {projects.length === 0 ? (
        <p>No projects yet.</p>
      ) : (
        <ul>
          {projects.map((project) => (
    <li key={project._id}>
        <Link to={`/projects/${project._id}`}>
        <h3>{project.name}</h3>
        </Link>
         <p>{project.description}</p>
    </li>
          ))}
        </ul>
      )}
    </main>
  );
}
