Learning Management System (LMS) - Backend

This is a backend for a Learning Management System (LMS) built with Node.js, Express.js, and PostgreSQL/Sequelize ORM.
It provides APIs for managing users, courses, lessons, enrollments, and more.

🚀 Features

User authentication (JWT based)

Role-based access (Admin, Instructor, Student)

Course management (create, update, delete, list)

Lesson management for courses

Student enrollment in courses

Progress tracking

Secure RESTful APIs

🛠️ Tech Stack

Node.js

Express.js

PostgreSQL + Sequelize ORM

JWT Authentication

Multer 
Project Structure
LMS-Backend/
│-- config/        # Database & environment configs  
│-- controllers/   # Route controllers  
│-- middlewares/   # Auth & error middlewares  
│-- migrations/    # Sequelize migrations  
│-- models/        # Sequelize models  
│-- routes/        # API routes  
│-- services/      # Business logic  
│-- utils/         # Helper functions  
│-- app.js         # Express app setup  
│-- index.js       # Server entry point  
