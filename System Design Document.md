
# System Design Document for Task Management Application

## 1.  **Overview**

This document outlines the system design for a Task Management Application. The application will allow users to create, view, edit, and delete tasks. It will also support task filtering by priority and status, as well as searching by title or description.

The system is built using:

-   **Backend**: Django with Django REST Framework (DRF) for the API.
-   **Frontend**: React for the user interface.
-   **Database**: PostgreSQL.
-   **Containerization**: Docker and Docker Compose for service orchestration.

----------

## 2.  **System Architecture**

The architecture follows a  **client-server**  model with a  **frontend**  (React) interacting with the  **backend**  (Django REST API) over HTTP.

### 2.1  **Components**

-   **Frontend**: React app for the UI, allowing users to interact with tasks.
-   **Backend**: Django app serving a REST API using DRF for task management.
-   **Database**: PostgreSQL database to store task data and user information.
-   **Authentication**: JSON Web Tokens (JWT) for secure user authentication.
-   **Containerization**: Docker containers for the backend, frontend, and PostgreSQL database.

### 2.2  **Communication Flow**

1.  **Frontend**  (React) sends HTTP requests to the  **Backend**  (Django API) for CRUD operations on tasks and user authentication.
2.  **Backend**  communicates with the  **Database**  (PostgreSQL) to persist task data.
3.  **Backend**  returns responses (task data, authentication tokens, etc.) to the  **Frontend**.

----------

## 3.  **Use Cases**

### 3.1  **User Authentication**

-   **Sign Up**: User can create an account by providing a username, email, and password.
-   **Login**: User can log in using their credentials and receive a JWT for authentication.
-   **JWT Authentication**: Each request to the API requires a valid JWT to access protected resources (tasks).

### 3.2  **Task Management**

-   **Create Task**: Users can create tasks with a title, description, priority, and status.
-   **Edit Task**: Users can update the details of a task.
-   **Delete Task**: Users can delete a task.
-   **View Tasks**: Users can view all their tasks.
-   **Filter Tasks**: Tasks can be filtered by priority (Low, Medium, High) and status (Pending, In Progress, Completed).
-   **Search Tasks**: Tasks can be searched by title or description.

----------

## 4.  **Technologies Used**

### 4.1  **Frontend (React)**

-   **React**: Library for building the user interface.
-   **Axios**: HTTP client for making API requests.
-   **React Router**: For navigation and routing between different pages.

### 4.2  **Backend (Django)**

-   **Django**: Python web framework for building the backend.
-   **Django REST Framework (DRF)**: For building REST APIs.
-   **djangorestframework-simplejwt**: For handling JWT-based authentication.
-   **PostgreSQL**: Relational database to store tasks and user data.
-   **django-cors-headers**: For handling cross-origin resource sharing (CORS) to allow React to communicate with Django.
-   **django-extensions**: Utility extensions for Django, including custom management commands.

### 4.3  **Containerization**

-   **Docker**: For containerizing the backend and frontend services.
-   **docker-compose**: For orchestrating multiple Docker containers (backend, frontend, PostgreSQL).

----------

## 5.  **Database Schema**

### 5.1  **User Model**

The  **User**  model extends Django's built-in  `AbstractUser`  model, adding custom fields if necessary.

-   **username**: The username of the user (unique).
-   **email**: The email address of the user (unique).
-   **password**: The user's hashed password.

### 5.2  **Task Model**

The  **Task**  model represents a task that belongs to a user.

-   **title**: The title of the task.
-   **description**: The description of the task.
-   **priority**: The priority of the task (Low, Medium, High).
-   **status**: The status of the task (Pending, In Progress, Completed).
-   **created_at**: Timestamp when the task was created.
-   **updated_at**: Timestamp when the task was last updated.
-   **user**: A foreign key to the User model, representing the task's owner.

----------

## 6.  **API Endpoints**

### 6.1  **User Authentication Endpoints**

-   **POST  `/api/token/`**: Obtain JWT tokens for login.
-   **POST  `/api/users/register/`**: Register a new user.

### 6.2  **Task Management Endpoints**

-   **GET  `/api/tasks/`**: Retrieve all tasks (with optional filters:  `priority`,  `status`,  `search`).
-   **POST  `/api/tasks/`**: Create a new task.
-   **GET  `/api/tasks/{id}/`**: Retrieve details of a specific task.
-   **PUT  `/api/tasks/{id}/`**: Update an existing task.
-   **DELETE  `/api/tasks/{id}/`**: Delete a specific task.

----------

## 7.  **Containerization**

### 7.1  **Dockerfile for Backend (Django)**

Dockerfile

Copy code

`# Use an official Python runtime as a parent image
FROM python:3.9-slim

WORKDIR /usr/src/app

# Install system dependencies required for psycopg2
RUN apt-get update && apt-get install -y build-essential libpq-dev && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

ENV DJANGO_SETTINGS_MODULE=config.settings

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]` 

### 7.2  **Dockerfile for Frontend (React)**

Dockerfile

Copy code

`FROM node:16-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]` 

### 7.3  **docker-compose.yml**

yaml

Copy code

`version: '3.9'

services:
  backend:
    build:
      context: ./backend
    container_name: django_backend
    volumes:
      - ./backend:/usr/src/app
    ports:
      - "8000:8000"
    environment:
      - DJANGO_SETTINGS_MODULE=config.settings
    depends_on:
      - db
    networks:
      - app-network

  frontend:
    build:
      context: ./frontend
    container_name: react_frontend
    volumes:
      - ./frontend:/usr/src/app
    ports:
      - "3000:3000"
    depends_on:
      - backend
    networks:
      - app-network

  db:
    image: postgres:13
    container_name: postgres_db
    environment:
      POSTGRES_DB: task_manager
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

volumes:
  postgres_data:` 

----------

## 8.  **Deployment**

1.  **Build Docker Images**:
    
    bash
    
    Copy code
    
    `docker-compose build` 
    
2.  **Start the Containers**:
    
    bash
    
    Copy code
    
    `docker-compose up` 
    
3.  **Run Django Migrations**:
    
    bash
    
    Copy code
    
    `docker-compose exec backend python manage.py migrate` 
    
4.  **Access the Application**:
    
    -   Frontend (React):  `http://localhost:3000`
    -   Backend (Django API):  `http://localhost:8000`

----------

## 9.  **Conclusion**

This document outlines the design and setup for a Task Management Application using  **Django**  and  **React**, containerized with  **Docker**. The application supports user authentication, task management (create, view, edit, delete), and filtering/searching tasks. It is built with scalability and maintainability in mind.