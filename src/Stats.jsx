import React, { useContext, useEffect } from "react";

import Header from "./Header";

import { useTasks } from "./TaskContext";

function Stats() {
  const { tasks } = useTasks();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const todayTasks = tasks.filter(
    (task) => task.date === getCurrentDate()
  ).length;

  return (
    <div>
      <Header></Header>
      <div className="flex gap-[100px] justify-center pt-24">
        <div className="w-[250px] h-24 bg-[#374151] rounded">
          <p className="text-white text-center mt-[20px] font-roboto">
            Total <br />
            {tasks.length}
          </p>
        </div>
        <div className="w-[250px] h-24 bg-[#374151] rounded">
          <p className="text-center text-white mt-[20px] font-roboto">
            Completed Tasks <br /> {completedTasks}
          </p>
        </div>
        <div className="w-[250px] h-24 bg-[#374151] rounded">
          <p className="text-center text-white mt-[20px] font-roboto">
            Today Tasks <br /> {todayTasks}
          </p>
        </div>
      </div>
    </div>
  );
}

const getCurrentDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  return `${day}.${month}.${year}`;
};

export default Stats;
