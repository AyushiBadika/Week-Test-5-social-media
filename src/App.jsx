import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Posts from "./Posts.jsx";
import { useState } from "react";
import Page from "./Page.jsx";
export default function App() {
  const [theme, setTheme] = useState("light");

  const handleToggleTheme = () => {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  };
  return (
    <BrowserRouter>
      <Navbar
        theme={theme}
        setTheme={setTheme}
        handleToggleTheme={handleToggleTheme}
      />
      <Routes>
        <Route path="/" element={<Posts theme={theme} />} />
        <Route path="/:id" element={<Page theme={theme} />} />
      </Routes>
    </BrowserRouter>
  );
}
