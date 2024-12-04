# Task Management Application

## Overview

This application is a **Task Management System** built using **Django** for the backend and **React** for the frontend. It allows users to **create**, **edit**, **delete**, **view** tasks, and filter tasks based on **priority** and **status**. Users can also search tasks by **title** or **description**. The application is **containerized** using **Docker** for easy deployment and management.

---

## Features

- **User Authentication**:
  - Register and log in users with JWT authentication.
  
- **Task Management**:
  - Create, view, edit, and delete tasks.
  - Filter tasks by **priority** (Low, Medium, High) and **status** (Pending, In Progress, Completed).
  - Search tasks by **title** or **description**.

- **Containerization**:
  - The entire application (backend, frontend, and database) is containerized using **Docker**.
  - Use **docker-compose** for managing the multi-container application (frontend, backend, PostgreSQL).

---

## Technologies Used

- **Frontend**: 
  - **React** for building the user interface.
  - **Axios** for making HTTP requests to the Django API.
  - **React Router** for navigation.

- **Backend**:
  - **Django** (Python web framework) for the backend API.
  - **Django REST Framework (DRF)** for building RESTful APIs.
  - **djangorestframework-simplejwt** for handling JWT-based authentication.
  - **PostgreSQL** for database management.

- **Containerization**:
  - **Docker** for containerizing the application.
  - **docker-compose** for managing multiple containers.

---

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

- Install **Docker** and **Docker Compose** on your machine.
  - **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
  - **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)

### Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/task-manager-app.git
cd task-manager-app


Thank you