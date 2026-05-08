# Team Task Manager

A full-stack Team Task Management web application built using the MERN stack.

## Features

- User Authentication (Login / Signup)
- Protected Routes using JWT
- Create, Edit, Delete Tasks
- Project-based Task Organization
- Task Status Filtering
- Search Functionality
- Overdue Task Highlighting
- Responsive Dashboard UI
- MongoDB Database Integration

## Screenshots

### Login Page(admin and member separately)
![Login](screenshots/login.png)

### Dashboard(admin and member) separately
![Dashboard](screenshots/dashboard.png)

### Tasks(admin creating and assigning task)
![Tasks](screenshots/tasks.png)

---

## Tech Stack

### Frontend
- React.js
- React Router
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

## Folder Structure

team-task-manager/
│
├── backend/
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── middleware/
│ └── server.js
│
├── frontend/
│ ├── src/
│ ├── public/
│ └── package.json
│
└── README.md

---

## Installation

### Clone Repository

```bash
git clone https://github.com/ankitaksah/team-task-manager.git

cd backend
npm install
npm start

cd frontend
npm install
npm start


## Environment Variables

Create a .env file inside backend:

MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

## Author

Ankita Kumari Sah