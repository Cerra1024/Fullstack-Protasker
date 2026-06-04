import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

export default function ProjectDetails() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProjectData() {
      try {
        const projectResponse = await api.get(`/projects/${id}`);
        const tasksResponse = await api.get(
          `/tasks/projects/${id}/tasks`
        );

        setProject(projectResponse.data);
        setTasks(tasksResponse.data);
      } catch (error) {
        setError("Failed to load project details");
      }
    }

    fetchProjectData();
  }, [id]);

  if (error) {
    return (
      <main>
        <p>{error}</p>
        <Link to="/dashboard">Back to Dashboard</Link>
      </main>
    );
  }

  if (!project) {
    return (
      <main>
        <p>Loading project...</p>
      </main>
    );
  }

  return (
    <main>
      <Link to="/dashboard">
        ← Back to Dashboard
      </Link>

      <h1>{project.name}</h1>

      <p>{project.description}</p>

      <section>
        <h2>Tasks</h2>

        {tasks.length === 0 ? (
          <p>No tasks yet.</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li key={task._id}>
                <h3>{task.title}</h3>

                <p>{task.description}</p>

                <p>Status: {task.status}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
