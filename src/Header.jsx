import React, { useContext } from "react";

import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="pt-2">
      <div className="flex gap-20 items-center px-2 py-1">
        <p className="text-white font-roboto l text-[25px] px-4">
          ToDo Planner
        </p>
        <Link to={"/"} className="text-white text-[20px]">
          Tasks
        </Link>
        <Link
          to={{
            pathname: "/stats",
          }}
          className="text-white text-[20px]"
        >
          Stats
        </Link>
        <Link to={"/settings"} className="text-white text-[20px]">
          Settings
        </Link>
      </div>
    </div>
  );
}

export default Header;
