# TaskMaster API

## Overview

TaskMaster API is a RESTful backend application built with Node.js, Express, MongoDB, and JWT authentication. The API allows users to register and log in securely, create and manage projects, and organize tasks within those projects.

The application demonstrates authentication, authorization, CRUD operations, MongoDB relationships, and secure API design.

---

## Features

### Authentication

* User registration
* User login
* Password hashing with bcrypt
* JWT token authentication

### Projects

* Create projects
* View all user projects
* View a single project
* Update project information
* Delete projects

### Tasks

* Create tasks within projects
* View project tasks
* Update task details and status
* Delete tasks

### Authorization

* Users can only access their own projects
* Users can only manage tasks belonging to their own projects

---

## Technologies Used

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT (JSON Web Tokens)
* bcrypt
* dotenv
* GitHub
* Postman

---

## API Endpoints

### Authentication

| Method | Endpoint            | Description           |
| ------ | ------------------- | --------------------- |
| POST   | /api/users/register | Register a user       |
| POST   | /api/users/login    | Login and receive JWT |

### Projects

| Method | Endpoint          | Description        |
| ------ | ----------------- | ------------------ |
| POST   | /api/projects     | Create project     |
| GET    | /api/projects     | Get all projects   |
| GET    | /api/projects/:id | Get single project |
| PUT    | /api/projects/:id | Update project     |
| DELETE | /api/projects/:id | Delete project     |

### Tasks

| Method | Endpoint                             | Description       |
| ------ | ------------------------------------ | ----------------- |
| POST   | /api/tasks/projects/:projectId/tasks | Create task       |
| GET    | /api/tasks/projects/:projectId/tasks | Get project tasks |
| PUT    | /api/tasks/:taskId                   | Update task       |
| DELETE | /api/tasks/:taskId                   | Delete task       |

---

## Authentication

Protected routes require a JWT token.

Example Authorization header:

```text
Authorization: Bearer <token>
```

---

## Database Relationships

```text
User
 └── Projects
      └── Tasks
```

Each project belongs to a user, and each task belongs to a project.


---

## Future Improvements

* Task due dates
* Task priorities
* Search and filtering


---

## Author

Cerra Ulysse
