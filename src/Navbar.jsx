import { useState } from "react";

export default function Navbar({ theme, handleToggleTheme }) {
  return (
    <div
      className={`h-20 ${
        theme === "light" ? "bg-blue-600" : "bg-gray-600"
      } w-[100vw] flex justify-between py-5 px-20 text-white items-center`}
    >
      <h2 className="text-2xl">GeekConnect</h2>
      <div className="w-12 h-5 bg-gray-400 flex items-center rounded-xl relative">
        <div
          className={`w-8 h-8 bg-black rounded-full absolute ${
            theme === "light" ? "left-0" : "right-0"
          } flex justify-center items-center`}
          onClick={handleToggleTheme}
        >
          {theme === "light" ? (
            <img src="../src/assets/night.png" alt="" />
          ) : (
            <img src="../src/assets/contrast.png" alt="" className="w-5 h-5" />
          )}
        </div>
      </div>
    </div>
  );
}
