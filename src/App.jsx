import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Stats from "./Stats";
import Tasks from "./Tasks";

import { TasksProvider } from "./TaskContext";

function App() {
  return (
    <TasksProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Tasks />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </Router>
    </TasksProvider>
  );
}

export default App;
