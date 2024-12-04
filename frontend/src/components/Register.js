import React, { useState } from "react";
import API from "../services/api";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", password: "", email: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("users/register/", formData);
      setMessage("User registered successfully!");
    } catch (error) {
      setMessage("Error registering user.");
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input type="text" name="username" onChange={handleChange} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" onChange={handleChange} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" onChange={handleChange} />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Register;
