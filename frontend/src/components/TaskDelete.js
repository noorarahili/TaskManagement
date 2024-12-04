import React, { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

const TaskDelete = () => {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const deleteTask = async () => {
      try {
        await API.delete(`tasks/${id}/`);
        setMessage("Task deleted successfully!");
        navigate("/tasks");
      } catch (error) {
        setMessage("Error deleting task.");
      }
    };

    deleteTask();
  }, [id, navigate]);

  return (
    <div className="container">
      <h2>Delete Task</h2>
      <p>{message}</p>
    </div>
  );
};

export default TaskDelete;
