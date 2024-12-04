import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const TaskCreate = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "M",
    status: "P",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("tasks/", task);
      setMessage("Task created successfully!");
      navigate("/tasks");
    } catch (error) {
      setMessage("Error creating task.");
    }
  };

  return (
    <div className="container">
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input type="text" name="title" onChange={handleChange} />
        </div>
        <div>
          <label>Description</label>
          <textarea name="description" onChange={handleChange}></textarea>
        </div>
        <div>
          <label>Priority</label>
          <select name="priority" onChange={handleChange}>
            <option value="L">Low</option>
            <option value="M">Medium</option>
            <option value="H">High</option>
          </select>
        </div>
        <div>
          <label>Status</label>
          <select name="status" onChange={handleChange}>
            <option value="P">Pending</option>
            <option value="I">In Progress</option>
            <option value="C">Completed</option>
          </select>
        </div>
        <button type="submit">Create Task</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default TaskCreate;
