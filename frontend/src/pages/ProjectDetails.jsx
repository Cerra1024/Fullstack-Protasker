import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import "./ProjectDetails.css";

export default function ProjectDetails() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");

  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTaskTitle, setEditTaskTitle] = useState("");
  const [editTaskDescription, setEditTaskDescription] = useState("");

  useEffect(() => {
    async function fetchProjectData() {
      try {
        const projectResponse = await api.get(`/projects/${id}`);
        const tasksResponse = await api.get(`/tasks/projects/${id}/tasks`);

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
        priority,
        dueDate,
        });

      setTasks([...tasks, response.data]);
      setTitle("");
      setDescription("");
      setStatus("To Do");
      setPriority("Medium");
      setDueDate("");
    } catch (error) {
      setError("Failed to create task");
    }
  }

  async function handleDeleteTask(taskId) {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      setError("Failed to delete task");
    }
  }

  async function handleUpdateTaskStatus(taskId, newStatus) {
    try {
      const response = await api.put(`/tasks/${taskId}`, {
        status: newStatus,
      });

      setTasks(
        tasks.map((task) =>
          task._id === taskId ? response.data : task
        )
      );
    } catch (error) {
      setError("Failed to update task");
    }
  }

  function startEditingTask(task) {
    setEditingTaskId(task._id);
    setEditTaskTitle(task.title);
    setEditTaskDescription(task.description);
  }

  function cancelEditingTask() {
    setEditingTaskId(null);
    setEditTaskTitle("");
    setEditTaskDescription("");
  }

  async function handleUpdateTask(e) {
    e.preventDefault();

    try {
      const response = await api.put(`/tasks/${editingTaskId}`, {
        title: editTaskTitle,
        description: editTaskDescription,
      });

      setTasks(
        tasks.map((task) =>
          task._id === editingTaskId ? response.data : task
        )
      );

      cancelEditingTask();
    } catch (error) {
      setError("Failed to update task");
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

  const todoCount = tasks.filter((task) => task.status === "To Do").length;
  const inProgressCount = tasks.filter(
 (task) => task.status === "In Progress"
 ).length;
 const doneCount = tasks.filter((task) => task.status === "Done").length;
 const overdueCount = 0;

  return (
    <main>
      <Link to="/dashboard">← Back to Dashboard</Link>

      <h1>{project.name}</h1>
      <p>{project.description}</p>

<section className="task-summary-grid">
    <div className="task-summary-card todo-card">
        <span>🔵</span>
        <div>
        <h3>{todoCount}</h3>
        <p>To Do</p>
        </div>
    </div>

    <div className="task-summary-card progress-card">
        <span>🟡</span>
        <div>
        <h3>{inProgressCount}</h3>
        <p>In Progress</p>
        </div>
    </div>

    <div className="task-summary-card done-card">
        <span>🟢</span>
        <div>
        <h3>{doneCount}</h3>
        <p>Done</p>
        </div>
    </div>

    <div className="task-summary-card overdue-card">
        <span>🔴</span>
        <div>
        <h3>{overdueCount}</h3>
        <p>Overdue</p>
        </div>
    </div>
    </section>

      <section>
        <h2>Tasks</h2>

        <form className="task-form" onSubmit={handleCreateTask}>
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
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
         >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
            </select>

            <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
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
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task._id} className="task-card">
                {editingTaskId === task._id ? (
                  <form onSubmit={handleUpdateTask}>
                    <input
                      type="text"
                      value={editTaskTitle}
                      onChange={(e) => setEditTaskTitle(e.target.value)}
                      required
                    />

                    <input
                      type="text"
                      value={editTaskDescription}
                      onChange={(e) =>
                        setEditTaskDescription(e.target.value)
                      }
                      required
                    />

                    <button type="submit">Save Task</button>

                    <button type="button" onClick={cancelEditingTask}>
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>

                     <p>
                        <strong>Priority:</strong> {task.priority || "Medium"}
                     </p>

                     <p>
                        <strong>Due:</strong>{" "}
                        {task.dueDate
                            ? new Date(task.dueDate).toLocaleDateString()
                            : "No due date"}
                      </p>

                    <label>
                      Status:
                      <select
                        value={task.status}
                        onChange={(e) =>
                          handleUpdateTaskStatus(task._id, e.target.value)
                        }
                      >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                      </select>
                    </label>

                    <button onClick={() => startEditingTask(task)}>
                      Edit Task
                    </button>

                    <button onClick={() => handleDeleteTask(task._id)}>
                      Delete Task
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
