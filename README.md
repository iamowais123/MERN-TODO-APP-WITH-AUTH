# 📝 MERN Todo App with JWT Authentication

A **Full Stack Todo Application** built with the **MERN stack** (MongoDB, Express.js, React, Node.js).  
This project demonstrates **CRUD operations**, **User Authentication using JWT**, and secure **user-specific todos**.

---

## 🚀 Features
- 🔑 **Authentication**
  - User Signup & Login using **JWT**
  - Passwords securely stored with **bcrypt**
  - Protected routes for logged-in users only

- ✅ **Todo Management (CRUD)**
  - Create new todos
  - Read (fetch) todos (user-specific)
  - Update todos
  - Delete todos

- 🌐 **Frontend**
  - Built with **React**
  - API integration using both **Axios** and **Fetch API** (Fetch code kept as reference)

- 📡 **Backend**
  - REST API using **Express.js**
  - Data stored in **MongoDB**
  - Middleware for authentication & validation

---

## 🛠️ Tech Stack
**Frontend**: React, Axios, Fetch API  
**Backend**: Node.js, Express.js, MongoDB  
**Authentication**: JWT, bcrypt  

---

## 📂 Project Structure
```bash
root
├── backend/         # Express + MongoDB + JWT backend
│   ├── models/      # Mongoose schemas
│   ├── routes/      # API routes
│   ├── controllers/ # Business logic
│   └── app.js    # Entry point
│
├── frontend/        # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│   └── package.json
│
└── README.md
