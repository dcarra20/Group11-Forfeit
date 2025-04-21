import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Calendar from "./Calendar";
import GoalForm from "./GoalForm";
import Goals from "./Goals";

function App() {
  return (
    <div className="app-background">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/create" element={<GoalForm />} />
      </Routes>
    </div>
  );
}

export default App;
