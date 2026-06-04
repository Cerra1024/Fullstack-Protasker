import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");

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

  return (
    <main>
      <h1>My Projects</h1>

      {error && <p>{error}</p>}

      {projects.length === 0 ? (
        <p>No projects yet.</p>
      ) : (
        <ul>
          {projects.map((project) => (
            <li key={project._id}>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
