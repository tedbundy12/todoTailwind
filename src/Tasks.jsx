import React from "react";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";



function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Функция для получения текущей даты в формате dd.mm.yyyy
  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Месяцы начинаются с 0
    const year = today.getFullYear();
    return `${day}.${month}.${year}`;
  };

  // Загружаем задачи из localStorage при первой загрузке
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    if (storedTasks.length) {
      setTasks(storedTasks);
    }
  }, []);

  // Сохраняем задачи в localStorage при их обновлении
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim()) {
      const newTask = {
        text: input,
        completed: false,
        date: getCurrentDate(), // Добавляем дату создания
        edited: false, // Изначально задача не отредактирована
      };
      setTasks([...tasks, newTask]);
      setInput("");
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const handleAddClick = () => {
    addTask();
  };

  const handleDeleteClick = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Функция для начала редактирования задачи
  const startEditingTask = (index) => {
    setEditingTaskIndex(index);
    setEditingText(tasks[index].text); // Устанавливаем текущее значение текста задачи для редактирования
  };

  // Функция для сохранения изменений текста задачи
  const saveTaskText = (index) => {
    if (editingText.trim() && editingText !== tasks[index].text) {
      const updatedTasks = tasks.map((task, i) =>
        i === index ? { ...task, text: editingText, edited: true } : task
      );
      setTasks(updatedTasks);
    }
    setEditingTaskIndex(null); // Останавливаем редактирование
  };

  const handleEditInputChange = (e) => {
    setEditingText(e.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <div className="flex-grow">
        <Header></Header>
        <p className="text-white font-roboto text-center font-medium text-[27px] mt-14">
          Today's Tasks
        </p>
        <div className="tasks pt-12 px-12">
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-700 p-4 mb-2 rounded-md"
              >
                {/* Кружочек для отметки выполнения */}
                <button
                  onClick={() => toggleTaskCompletion(index)}
                  className={`w-6 h-6 mr-4 rounded-full border-2 flex-shrink-0 ${
                    task.completed
                      ? "bg-purple-500 border-purple-500"
                      : "border-gray-500"
                  }`}
                ></button>

                {/* Режим редактирования текста задачи */}
                {editingTaskIndex === index ? (
                  <input
                    type="text"
                    value={editingText}
                    onChange={handleEditInputChange}
                    onBlur={() => saveTaskText(index)} // Сохраняем при потере фокуса
                    className="flex-grow bg-gray-800 text-white p-2 rounded-md mr-4"
                  />
                ) : (
                  <div className="flex-grow max-w-full">
                    <p
                      className={`text-white text-[20px] break-words ${
                        task.completed ? "text-gray-400" : ""
                      }`}
                      style={{ wordBreak: "break-word" }}
                    >
                      {task.text}
                    </p>

                    {/* Если задача была отредактирована, отображаем "edited" */}
                    {task.edited && (
                      <span className="text-sm text-gray-400 font-roboto ">
                        (edited)
                      </span>
                    )}
                  </div>
                )}

                {/* Дата создания задачи */}
                <p className="text-gray-400 text-[16px] mr-4 flex-shrink-0">
                  {task.date}
                </p>

                {/* Иконка для редактирования задачи */}
                <button
                  onClick={() => startEditingTask(index)}
                  className="text-yellow-400 hover:text-yellow-600 text-0xl flex-shrink-0 mr-2"
                >
                  ✎
                </button>

                {/* Кнопка для удаления задачи */}
                <button
                  onClick={() => handleDeleteClick(index)}
                  className="text-red-500 hover:text-red-700 text-0xl flex-shrink-0"
                >
                  ❌
                </button>
              </div>
            ))
          ) : (
            <p className="text-white font-roboto text-[25px] text-center font-medium">
              No tasks yet :0
            </p>
          )}
        </div>
      </div>

      <div className="action flex items-center justify-center bg-gray-800 p-4">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="flex-1 p-2 rounded-md border-2 border-gray-600 bg-gray-700 text-white placeholder-white placeholder-roboto outline-none"
          placeholder="Add a new task"
        />
        <button
          onClick={handleAddClick}
          className="ml-2 bg-blue-500 text-white px-12 font-roboto py-2 rounded"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default Tasks;
