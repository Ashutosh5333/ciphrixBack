# 🚀 Task Manager API (Backend – Node.js + Express + MongoDB)

This is the backend API for the **Task Management Application (MERN Stack)**.
It includes secure authentication, role-based access control, and task CRUD APIs.


## 🔧 **Tech Stack**

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* Bcrypt Password Hashing
* Role-Based Access (Admin / User)
* CORS
* Express Validator


## 📁 **Project Structure**

```
backend/
│── config/
│   ├── cors.js
│   ├── db.js
│── controllers/
│── middleware/
│── models/
│── routes/
│── seed/
│   └── seedAdmin.js
│── server.js
│── package.json
│── .env
```

## 🔐 **Features**

* User Signup & Signin (JWT-based)
* Admin & Normal User roles
* CRUD APIs for Tasks
* Admin-only delete permission
* Server-side validation
* Secure password hashing using bcrypt
* Optimized CORS configuration
* HTTPS-ready structure (optional)
* Clean error handling middleware


## ⚙️ **Installation & Setup**

### 1️⃣ Install dependencies

```bash
cd backend
npm install
```

### 2️⃣ Create `.env` file

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CORS_ORIGINS=*
```

### 3️⃣ Seed Admin User

Creates:

* Email: **[admin@example.com](mailto:admin@example.com)**
* Password: **Admin@123**
* Role: **admin**

```bash
npm run seed
```

### 4️⃣ Start the server

```bash
npm start
```

Server runs at:

```
http://localhost:5000
```


## 🧪 **API Endpoints**

### 🔑 Auth

| Method | Endpoint           | Description     |
| ------ | ------------------ | --------------- |
| POST   | `/api/auth/signup` | Create new user |
| POST   | `/api/auth/signin` | Login user      |


### 📌 Tasks

| Method | Endpoint         | Description                       |
| ------ | ---------------- | --------------------------------- |
| GET    | `/api/tasks`     | List tasks (pagination supported) |
| GET    | `/api/tasks/:id` | Get single task                   |
| POST   | `/api/tasks`     | Create task                       |
| PUT    | `/api/tasks/:id` | Update task                       |
| DELETE | `/api/tasks/:id` | **Admin only**                    |


## 👮 **Role Logic (Important)**

| Action      | User | Admin |
| ----------- | ---- | ----- |
| Create Task | ✔️   | ✔️    |
| Edit Task   | ✔️   | ✔️    |
| View Tasks  | ✔️   | ✔️    |
| Delete Task | ❌    | ✔️    |


## 🔥 Admin Middleware

Ensures only admins can delete:

```js
if (req.user.role !== "admin") {
  return res.status(403).json({ message: "Admin role required" });
}
```
