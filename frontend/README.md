# Pro-Tasker

A full-stack project management application that allows users to create projects, manage tasks, track progress, and organize work through a clean dashboard interface.

---

# Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Password Hashing with bcrypt

## Dashboard

- View all projects
- Create projects
- Edit projects
- Delete projects
- Project progress tracking
- Project statistics
- Task summary cards
  - To Do
  - In Progress
  - Done
  - Overdue

## Project Details

- View project information
- Create tasks
- Edit tasks
- Delete tasks
- Update task status
- Assign task priority
- Set task due dates
- Progress tracking
- Priority badges
- Task management interface

---

# Tech Stack

## Frontend

- React
- React Router DOM
- Axios
- CSS

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose

## Authentication

- JWT (JSON Web Token)
- bcrypt

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
cd pro-tasker
```

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=3001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend:

```bash
npm run dev
```

or

```bash
node server.js
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

Backend URL:

```text
http://localhost:3001
```

---

# API Endpoints

## User Routes

### Register User

```http
POST /api/users/register
```

Request Body:

```json
{
  "username": "cerra",
  "email": "cerra@example.com",
  "password": "password123"
}
```

### Login User

```http
POST /api/users/login
```

Request Body:

```json
{
  "email": "cerra@example.com",
  "password": "password123"
}
```

---

## Project Routes

### Get All Projects

```http
GET /api/projects
```

### Get Single Project

```http
GET /api/projects/:id
```

### Create Project

```http
POST /api/projects
```

Request Body:

```json
{
  "name": "Portfolio Website",
  "description": "Build portfolio website"
}
```

### Update Project

```http
PUT /api/projects/:id
```

### Delete Project

```http
DELETE /api/projects/:id
```

---

## Task Routes

### Get Tasks For A Project

```http
GET /api/tasks/projects/:projectId/tasks
```

### Create Task

```http
POST /api/tasks/projects/:projectId/tasks
```

Request Body:

```json
{
  "title": "Build Login Page",
  "description": "Create authentication UI",
  "status": "To Do",
  "priority": "High",
  "dueDate": "2026-06-15"
}
```

### Update Task

```http
PUT /api/tasks/:taskId
```

### Delete Task

```http
DELETE /api/tasks/:taskId
```

---

# Project Structure

```text
backend/
├── models/
│   ├── User.js
│   ├── Project.js
│   └── Task.js
│
├── routes/
│   ├── userRoutes.js
│   ├── projectRoutes.js
│   └── taskRoutes.js
│
├── middleware/
│   └── authMiddleware.js
│
└── server.js

frontend/
├── src/
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── ProjectDetails.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   └── App.jsx
```

---

# Future Improvements

- Dark mode
- Drag-and-drop task management
- Task filtering
- Search functionality
- Team collaboration
- Notifications
- Real overdue task detection
- Charts and analytics

---

# Author

**Cerra Ulysse**

Full Stack Software Engineering Student

Built using React, Express, MongoDB, and Node.js.