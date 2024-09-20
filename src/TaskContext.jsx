// TaskContext.jsx
import React, { createContext, useContext, useState } from 'react';

const TasksContext = createContext();

export function useTasks() {
  return useContext(TasksContext);
}

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const completedTasks = tasks.filter(tasks => tasks.completed).length

  return (
    <TasksContext.Provider value={{ tasks, setTasks, completedTasks }}>
      {children}
    </TasksContext.Provider>
  );
}
