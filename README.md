# Task Tracker Application

A full-stack **Task Management System** that allows users to register, login, and manage their tasks.
The project includes **JWT authentication, role-based access control, admin dashboard, and a modern React UI**.

---

# Project Preview

### Login Page
Dark themed authentication interface with secure login.
<img width="1920" height="930" alt="Screenshot From 2026-03-06 23-25-51" src="https://github.com/user-attachments/assets/224dca14-ecf8-4a9e-9997-53c5dd2fd705" />

### User Dashboard
Users can manage their tasks with a modern glass UI.
<img width="1920" height="930" alt="Screenshot From 2026-03-06 23-26-07" src="https://github.com/user-attachments/assets/6cde9fb5-afc5-4797-a323-af64441d41ba" />

### Admin Dashboard
Admins can view and manage registered users.
<img width="1920" height="930" alt="Screenshot From 2026-03-06 23-26-28" src="https://github.com/user-attachments/assets/6be9c0f3-65f6-4625-a128-d6cf03de65f6" />

---

# Features

## Authentication

* User Registration
* User Login
* JWT Authentication
* Password Hashing using bcrypt
* Role Based Access (User / Admin)

---

## User Features

Users can:

* Create tasks
* Update tasks
* Mark tasks as completed
* Delete tasks
* View task statistics

Each task contains:

* `title`
* `description`
* `status`
* `created_at`

---

## Admin Features

Admins can:

* View all registered users
* Delete users

Admin routes are protected using middleware.

---

# Tech Stack

## Frontend

* React
* TypeScript
* Vite
* TailwindCSS
* shadcn/ui
* Axios
* React Router
* Sonner Toast Notifications

---

## Backend

* Node.js
* Express.js
* Prisma ORM
* SQLite / PostgreSQL
* JWT Authentication
* bcrypt

---

# Project Structure

```
assignment
│
├── backend
│   ├── prisma
│   ├── src
│   │   ├── controller
│   │   ├── middleware
│   │   └── routes
│   ├── tests
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── constants
│   │   ├── lib
│   │   └── assets
│   ├── App.tsx
│   └── main.tsx
│
└── README.md
```

---

# Installation

## 1 Clone Repository

```
git clone https://github.com/RuthlessG-CYBER/Resultprep_Assignment.git
cd task-tracker
```

---

# Backend Setup

Navigate to backend folder

```
cd backend
npm install
```

Create `.env`

```
DATABASE_URL="file:./dev.db"
JWT_SECRET=your_secret_key
PORT=5000
```

Run migrations

```
npx prisma migrate dev
```

Start server

```
node server.js
```

Backend will run on

```
http://localhost:5000
```

---

# Frontend Setup

Navigate to frontend

```
cd frontend
npm install
npm run dev
```

Frontend will run on

```
http://localhost:5173
```

---

# API Routes

## Authentication

| Method | Endpoint    | Description   |
| ------ | ----------- | ------------- |
| POST   | `/register` | Register user |
| POST   | `/login`    | Login user    |

---

## Tasks

| Method | Endpoint     | Description    |
| ------ | ------------ | -------------- |
| POST   | `/tasks`     | Create task    |
| GET    | `/tasks`     | Get user tasks |
| PUT    | `/tasks/:id` | Update task    |
| DELETE | `/tasks/:id` | Delete task    |

All task routes require **JWT authentication**.

---

## Admin Routes

| Method | Endpoint           | Description |
| ------ | ------------------ | ----------- |
| DELETE | `/admin/users/:id` | Delete user |

Admin routes require:

* JWT token
* Admin role

---

# Middleware

### verifyToken

Verifies JWT token and attaches user to request.

### isAdmin

Checks if the logged in user has admin role.

---

# Security

* JWT Authentication
* Password hashing using bcrypt
* Protected routes using middleware
* Role based access control

---

# How To Test

1 Register a new user
2 Login to receive JWT token
3 Create tasks from dashboard
4 Update or delete tasks
5 Register an admin account
6 Login as admin and manage users

---

# Author

Soumya Panda
Full Stack Developer
