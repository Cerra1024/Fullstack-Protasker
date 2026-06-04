import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

export default function ProjectDetails() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

 const [title, setTitle] = useState("");
 const [description, setDescription] = useState("");
 const [status, setStatus] = useState("To Do");

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

  async function handleCreateTask(e) {
  e.preventDefault();

  try {
    const response = await api.post(`/tasks/projects/${id}/tasks`, {
      title,
      description,
      status,
    });

    setTasks([...tasks, response.data]);

    setTitle("");
    setDescription("");
    setStatus("To Do");
  } catch (error) {
    setError("Failed to create task");
  }
}

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
        <form onSubmit={handleCreateTask}>
  <h3>Create Task</h3>

  <input
    type="text"
    placeholder="Task title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    required
  />

  <input
    type="text"
    placeholder="Task description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    required
  />

  <select
    value={status}
    onChange={(e) => setStatus(e.target.value)}
  >
    <option value="To Do">To Do</option>
    <option value="In Progress">In Progress</option>
    <option value="Done">Done</option>
  </select>

  <button type="submit">Create Task</button>
  </form>

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
