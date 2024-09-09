import React, { useContext, useEffect } from "react";

import Header from "./Header";

import { TasksContext } from "./TaskContext"; // Импортируем контекст

function Stats() {
  const { tasks } = useContext(TasksContext); // Получаем задачи из контекста

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
            Completed Tasks <br /> 4
          </p>
        </div>
        <div className="w-[250px] h-24 bg-[#374151] rounded">
          <p className="text-center text-white mt-[20px] font-roboto">
            Today Tasks <br /> 2
          </p>
        </div>
      </div>
    </div>
  );
}

export default Stats;
