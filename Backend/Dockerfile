# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Install system dependencies required for psycopg2
RUN apt-get update && \
    apt-get install -y build-essential libpq-dev && \
    rm -rf /var/lib/apt/lists/*

# Copy the requirements file into the container
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire backend project into the container
COPY . .

# Expose the port that Django will run on
EXPOSE 8000

# Set environment variable for Django settings module
ENV DJANGO_SETTINGS_MODULE=TaskManager.settings

# Run Django's development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
