import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import "./index.css";
import { TasksProvider } from "./TaskContext.jsx";

createRoot(document.getElementById("root")).render(
  <TasksProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </TasksProvider>
);
