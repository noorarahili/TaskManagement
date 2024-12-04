import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

const TaskEdit = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "M",
    status: "P",
  });
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await API.get(`tasks/${id}/`);
        setTask(response.data);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };
    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`tasks/${id}/`, task);
      setMessage("Task updated successfully!");
      navigate("/tasks");
    } catch (error) {
      setMessage("Error updating task.");
    }
  };

  return (
    <div className="container">
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label>Priority</label>
          <select name="priority" value={task.priority} onChange={handleChange}>
            <option value="L">Low</option>
            <option value="M">Medium</option>
            <option value="H">High</option>
          </select>
        </div>
        <div>
          <label>Status</label>
          <select name="status" value={task.status} onChange={handleChange}>
            <option value="P">Pending</option>
            <option value="I">In Progress</option>
            <option value="C">Completed</option>
          </select>
        </div>
        <button type="submit">Update Task</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default TaskEdit;
