import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import "./Dashboard.css";


export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  function handleLogout() {
  logout();
  navigate("/login");
  }
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");

  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [todoTasks, setTodoTasks] = useState(0);
  const [inProgressTasks, setInProgressTasks] = useState(0);
  const [overdueTasks, setOverdueTasks] = useState(0);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

    useEffect(() => {
    async function fetchProjects() {
     try {
      const response = await api.get("/projects");

      const projectsWithTasks = await Promise.all(
        response.data.map(async (project) => {
          const taskResponse = await api.get(
            `/tasks/projects/${project._id}/tasks`
          );

          const totalTasks = taskResponse.data.length;

          const completedTasks = taskResponse.data.filter(
            (task) => task.status === "Done"
          ).length;

          return {
            ...project,
            totalTasks,
            completedTasks,
            tasks: taskResponse.data,
          };
        })
      );

      setProjects(projectsWithTasks);

      const allTasks = projectsWithTasks.flatMap(
          (project) => project.tasks || []
        );

        setTotalTasks(allTasks.length);

        setCompletedTasks(
          allTasks.filter((task) => task.status === "Done").length
        );

        setTodoTasks(
          allTasks.filter((task) => task.status === "To Do").length
        );

        setInProgressTasks(
          allTasks.filter((task) => task.status === "In Progress").length
        );

        setOverdueTasks(0);
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

async function handleDeleteProject(projectId) {
  try {
    await api.delete(`/projects/${projectId}`);

    setProjects(
      projects.filter(
        (project) => project._id !== projectId
      )
    );
  } catch (error) {
    setError("Failed to delete project");
  }
}

function startEditing(project) {
  setEditingProjectId(project._id);
  setEditName(project.name);
  setEditDescription(project.description);
}

function cancelEditing() {
  setEditingProjectId(null);
  setEditName("");
  setEditDescription("");
}

async function handleUpdateProject(e) {
  e.preventDefault();

  try {
    const response = await api.put(`/projects/${editingProjectId}`, {
      name: editName,
      description: editDescription,
    });

    setProjects(
      projects.map((project) =>
        project._id === editingProjectId ? response.data : project
      )
    );

    cancelEditing();
  } catch (error) {
    setError("Failed to update project");
  }
}


  return (
  <div className="dashboard-layout">

    <aside className="sidebar">
      <h2>Pro-Tasker</h2>

      <nav className="sidebar-nav">
        <span>Dashboard</span>
        <span>Projects</span>
        <span>Tasks</span>
      </nav>

      <button onClick={handleLogout}>
        Logout
      </button>
    </aside>

    <main className="main-content">
      <div className="page-header">
         <div>
            <h1>Good morning, {user?.username}! 👋</h1>
            <p>Here's what's happening with your projects today.</p>
          </div>
       </div>

      <section className="stats-grid">
      <div className="stat-card">
        <span>📁</span>
        <h3>{projects.length}</h3>
        <p>Projects</p>
      </div>

      <div className="stat-card">
        <span>✅</span>
        <h3>{totalTasks}</h3>
        <p>Tasks</p>
      </div>

      <div className="stat-card">
        <span>🎯</span>
        <h3>{completedTasks}</h3>
        <p>Completed</p>
      </div>
    </section>

    <section className="dashboard-grid">
      <form
      className="project-form"
      onSubmit={handleCreateProject}
      >
      <h2>Create New Project</h2>

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

    <section className="task-overview-card">
    <h2>Task Overview</h2>

    <div className="overview-content">
    <div className="donut-chart"></div>

    <div className="overview-list">
      <p>
        <span className="dot todo"></span>
        To Do
        <strong>{todoTasks}</strong>
      </p>

      <p>
        <span className="dot progress"></span>
        In Progress
        <strong>{inProgressTasks}</strong>
      </p>

      <p>
        <span className="dot done"></span>
        Completed
        <strong>{completedTasks}</strong>
      </p>

      <p>
        <span className="dot overdue"></span>
        Overdue
        <strong>{overdueTasks}</strong>
      </p>
    </div>
  </div>
</section>
</section>

    <h1>Project Workspace</h1>

      {error && <p>{error}</p>}

      {projects.length === 0 ? (
        <p>No projects yet.</p>
      ) : (
        <ul className="project-list">
          {projects.map((project) => (
      <li
      key={project._id}
      className="project-card"
      >
    {editingProjectId === project._id ? (
      <form onSubmit={handleUpdateProject}>
        <input
        type="text"
        value={editName}
        onChange={(e) => setEditName(e.target.value)}
        required
      />

      <input
        type="text"
        value={editDescription}
        onChange={(e) => setEditDescription(e.target.value)}
        required
      />

      <button type="submit">Save</button>

      <button type="button" onClick={cancelEditing}>
        Cancel
      </button>
    </form>
      ) : (
    <>
    <Link to={`/projects/${project._id}`}>
      <h3>{project.name}</h3>
    </Link>

    <p>{project.description}</p>

    <div className="project-progress">
      <p>
        <strong>{project.completedTasks || 0}</strong> of{" "}
        <strong>{project.totalTasks || 0}</strong> Tasks Completed
      </p>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width:
              project.totalTasks > 0
                ? `${(project.completedTasks / project.totalTasks) * 100}%`
                : "0%",
          }}
        ></div>
      </div>
    </div>

    <p className="last-updated">
      📅 Last updated:{" "}
      {new Date(project.updatedAt).toLocaleDateString()}
    </p>

    <div className="project-actions">
      <button onClick={() => startEditing(project)}>
        ✏️ Edit
      </button>

      <button onClick={() => handleDeleteProject(project._id)}>
        🗑 Delete
      </button>
    </div>
  </>

     )}
    </li>
      ))}
        </ul>
      )}
        </main>

  </div>
  );
}

