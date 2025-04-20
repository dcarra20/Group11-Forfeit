import React, { useEffect, useState } from "react";

export default function Goals() {
  const [goals, setGoals] = useState([]);
  const [activeTab, setActiveTab] = useState("active");

  useEffect(() => {
    const savedGoals = JSON.parse(localStorage.getItem("goals")) || [];
    setGoals(savedGoals);
  }, []);

  const markAsComplete = (index) => {
    const updatedGoals = [...goals];
    updatedGoals[index].completed = true;
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
    setGoals(updatedGoals);
  };

  const renderGoals = (filterCompleted) => {
    return goals
      .map((goal, index) => ({ ...goal, index }))
      .filter((goal) => goal.completed === filterCompleted)
      .map((goal) => (
        <tr key={goal.index}>
          <td>{goal.name}</td>
          <td>{goal.deadline}</td>
          <td>{goal.category}</td>
          <td
            className="complete"
            onClick={() => !goal.completed && markAsComplete(goal.index)}
            style={{ cursor: goal.completed ? "default" : "pointer" }}
          >
            {goal.completed ? "✔️" : ""}
          </td>
        </tr>
      ));
  };

  return (
    <div className="goals-page">
      <div className="goals-tabs">
        <button
          className={`tab-btn ${activeTab === "active" ? "active" : ""}`}
          onClick={() => setActiveTab("active")}
        >
          Active
        </button>
        <button
          className={`tab-btn ${activeTab === "past" ? "active" : ""}`}
          onClick={() => setActiveTab("past")}
        >
          Past
        </button>
      </div>

      {activeTab === "active" && (
        <div className="goals-list">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Category</th>
                <th>Complete</th>
              </tr>
            </thead>
            <tbody>{renderGoals(false)}</tbody>
          </table>
        </div>
      )}

      {activeTab === "past" && (
        <div className="goals-list">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Category</th>
                <th>Complete</th>
              </tr>
            </thead>
            <tbody>{renderGoals(true)}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}
