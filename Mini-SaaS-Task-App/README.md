# Mini SaaS Task Management System

A production-ready, full-stack Task Management application where users can register, log in, and manage their own private task lists. Built for the Product Space Company Full Stack Developer Intern Screening Test.

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, React Router, Axios, Lucide React
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL with Sequelize ORM
- **Authentication**: JWT (JSON Web Tokens), bcrypt

## Features

- **Secure Authentication**: JWT-based login and signup with password hashing.
- **Private Workspaces**: Users can only see and manage their own tasks (One-to-Many User-Task relationship).
- **Full CRUD Tasks**: Create tasks, view pending/completed lists, toggle status, and delete tasks.
- **Modern UI**: Clean, responsive, and intuitive interface with Tailwind CSS and Lucide icons.
- **Optimistic UI Updates**: Instant feedback when toggling or deleting tasks.

## Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

- Node.js installed
- PostgreSQL installed and running locally
- Git

### 1. Database Setup

1. Open your PostgreSQL interface (pgAdmin or terminal).
2. Create a new database named `task_app` (or any name you prefer):
   ```sql
   CREATE DATABASE task_app;
   ```

### 2. Backend Setup

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd Mini-SaaS-Task-App/backend
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Update the `.env` file if your database credentials differ from the default:
   ```env
   PORT=5000
   DATABASE_URL=postgres://postgres:postgres@localhost:5432/task_app
   JWT_SECRET=supersecretkey_change_in_production
   ```
   *(Change `postgres:postgres` to your local postgres username and password).*
4. Start the backend server:
   ```bash
   npm start
   ```
   *Note: Sequelize will automatically connect and create the necessary tables on startup.*

### 3. Frontend Setup

1. Open a **new** terminal and navigate to the frontend directory:
   ```bash
   cd Mini-SaaS-Task-App/frontend
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`.

## Folder Structure

```
Mini-SaaS-Task-App/
├── backend/                  # Node.js + Express API
│   ├── controllers/          # Business logic for auth and tasks
│   ├── middlewares/          # JWT verification middleware
│   ├── models/               # Sequelize models and relationships
│   ├── routes/               # API route definitions
│   ├── server.js             # Main application entry point
│   └── package.json
└── frontend/                 # React UI
    ├── src/
    │   ├── components/       # Reusable UI parts (Navbar, TaskItem)
    │   ├── pages/            # Page components (Login, Dashboard)
    │   ├── services/         # Axios API configuration
    │   ├── App.jsx           # Routing configuration
    │   └── index.css         # Tailwind global styles
    ├── tailwind.config.js    # Tailwind configuration
    └── package.json
```

## Future Improvements

- Add task deadlines and priority levels.
- Implement email verification for signups.
- Add user profile settings (change password, update avatar).
- Deploy using Docker containers.
