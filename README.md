# 📝 To-Do App

![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styled-38B2AC?logo=tailwindcss)
![Jotai](https://img.shields.io/badge/Jotai-State-green)
![License](https://img.shields.io/badge/ISC-License-lightgrey)
![Deploy-Vercel](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel)

A simple and responsive To-Do App built with **Next.js**, **React**, and **Tailwind CSS**. It features **JWT-based** authentication, route protection, and a modern **Kanban board** interface for task management.

---

## 📄 License

> Copyright (c) 2025 Hoang Phuc Huynh  
> This project is licensed under the ISC License.

---

## 📚 Table of Contents

- [📝 To-Do App](#-to-do-app)
  - [🔗 Project Links](#-project-links)
  - [🚀 Features](#-features)
  - [📦 Dependencies](#-dependencies)
  - [🌐 API Endpoints](#-api-endpoints)
  - [🧩 Key Components \& Pages](#-key-components--pages)
  - [🧱 Kanban Board Overview](#-kanban-board-overview)
  - [🛡️ Route Protection Flow](#️-route-protection-flow)
  - [📌 Notes](#-notes)

---

## 🔗 Project Links

- 🖥️ Backend Repository: [To-Do Backend (Node.js)](https://github.com/Harry-Huynh/To-Do-Backend)
- 🌐 Live Website: [Visit the App](https://to-do-app-frontend-tawny-delta.vercel.app/)

---

## 🚀 Features

- 🔐 **Authentication & Authorization** using JWT tokens
- 🚫 **Protected Routes** for authenticated users only
- 🌐 **Public Routes** for login and registration
- 📝 **Task Management**:
  - Create new tasks
  - Read and display existing tasks
  - Update tasks
  - Delete tasks
- 📱 **Responsive Design** using Tailwind CSS
- 🧱 **Kanban View** for task organization
- ✂️ **Text Truncation** to prevent overflow in UI

---

## 📦 Dependencies

- `jotai`: For global state management
- `next/router`: For route navigation and route change events
- Custom modules:
  - `@/lib/authenticate`: Contains all logic related to user authentication (e.g., login, logout, checking if a user is authenticated).
  - `@/lib/userData`: Handles all task-related logic (e.g., fetching, creating, updating, and deleting tasks).
  - `@/store`: Contains `taskAtom` for state management

---

## 🌐 API Endpoints

The app communicates with the following API endpoints:

| Endpoint    | Description                           |
| ----------- | ------------------------------------- |
| `/tasks`    | Handles CRUD operations for tasks     |
| `/login`    | Authenticates users and issues tokens |
| `/register` | Registers new user accounts           |

---

## 🧩 Key Components & Pages

- **`RouteGuard`**: Protects routes by checking user authentication
- **`TaskContainer`**: Displays the list of tasks
- **`Task`**: Renders individual task items
- **`Login` Page**: Manages user login
- **`Register` Page**: Handles user sign-up

## 🧱 Kanban Board Overview

**The task list is presented in a Kanban-style board for intuitive task tracking and progress visualization.**

**Features:**

- 📦 Columns represent task states (e.g., To-Do, In Progress, Done)
- 📌 Tasks are grouped and rendered based on their status
- 🖱️ Tasks can be updated via UI interactions (e.g., drag-and-drop or double-click on card to modify the status of tasks)
- 🎨 Tailwind CSS ensures responsiveness and clean design

## 🛡️ Route Protection Flow

1. `RouteGuard` runs `isAuthenticated()` to verify access.
2. If unauthorized and accessing a protected route, the user is redirected to `/login`.
3. If authenticated, `getTasks()` is called to load user data.
4. Route changes are tracked using `router.events` to re-verify auth status dynamically.

---

## 📌 Notes

- Ensure JWT tokens are securely stored (e.g., in `localStorage`).
- Data loading only occurs **after** authentication is confirmed.
- Reloading the page reloads the auth state and tasks due to initial `useEffect`.

---
