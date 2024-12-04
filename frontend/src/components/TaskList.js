import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({
    priority: "",
    status: "",
    search: "",
  });

  // Fetch tasks with filters applied
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await API.get("tasks/", {
          params: filters,  // Pass filters as query parameters
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, [filters]);

  // Handle filter change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <h2>Task List</h2>
      <div>
        <label>Search</label>
        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleChange}
          placeholder="Search tasks by title or description"
        />
      </div>
      <div>
        <label>Priority</label>
        <select name="priority" onChange={handleChange}>
          <option value="">All</option>
          <option value="L">Low</option>
          <option value="M">Medium</option>
          <option value="H">High</option>
        </select>
      </div>
      <div>
        <label>Status</label>
        <select name="status" onChange={handleChange}>
          <option value="">All</option>
          <option value="P">Pending</option>
          <option value="I">In Progress</option>
          <option value="C">Completed</option>
        </select>
      </div>
      <Link to="/tasks/create">Create New Task</Link>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong>: {task.description} (Status: {task.status})
            <br />
            <Link to={`/tasks/edit/${task.id}`}>Edit</Link> | 
            <Link to={`/tasks/delete/${task.id}`}>Delete</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;