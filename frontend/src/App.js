import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import TaskList from "./components/TaskList";
import TaskCreate from "./components/TaskCreate";
import TaskEdit from "./components/TaskEdit";
import TaskDelete from "./components/TaskDelete";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/tasks/create" element={<TaskCreate />} />
        <Route path="/tasks/edit/:id" element={<TaskEdit />} />
        <Route path="/tasks/delete/:id" element={<TaskDelete />} />
      </Routes>
    </Router>
  );
};

export default App;
