import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import List from "./components/List";

const App1 = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/list" element={<List />} />
    </Routes>
  );
};

export default App1;
