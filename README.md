# 📝 To-Do App

![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styled-38B2AC?logo=tailwindcss)
![Jotai](https://img.shields.io/badge/Jotai-State-green)
![License](https://img.shields.io/badge/ISC-License-lightgrey)
![Deploy-Vercel](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel)

A simple and responsive to-do app built with **Next.js**, **React**, and **Tailwind CSS**. This application allows users to manage tasks and includes user authentication and route protection using **JWT tokens**.

---

## 🔗 Project Links

- 🖥️ Backend Repository: [To-Do Backend (Node.js)](https://github.com/Harry-Huynh/To-Do-Backend)
- 🌐 Live Website: [Visit the App](https://to-do-app-frontend-tawny-delta.vercel.app/)

---

## 📄 License

> Copyright (c) 2025 Hoang Phuc Huynh  
> This project is licensed under the ISC License.

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
