import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Goals() {
  const [goals, setGoals] = useState([]);
  const [activeTab, setActiveTab] = useState("active");
  const [moneySaved, setMoneySaved] = useState(0);

  useEffect(() => {
    const savedGoals = JSON.parse(localStorage.getItem("goals")) || [];
    setGoals(savedGoals);
    const totalSaved = savedGoals
      .filter((goal) => goal.completed)
      .reduce((sum, goal) => sum + Number(goal.wager || 0), 0);

    setMoneySaved(totalSaved);
  }, []);

  const markAsComplete = (index) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const updatedGoals = [...goals];
          updatedGoals[index].completed = true;
          updatedGoals[index].proofImage = reader.result;
          localStorage.setItem("goals", JSON.stringify(updatedGoals));
          setGoals(updatedGoals);
        };
        reader.readAsDataURL(file);
      }
    };

    fileInput.click();
  };

  const renderGoals = (filterCompleted) => {
    return goals
      .map((goal, index) => ({ ...goal, index }))
      .filter((goal) => goal.completed === filterCompleted)
      .map((goal) => (
        <tr key={goal.index}>
          <td>{goal.name}</td>
          <td>
            <Link
              to="/calendar"
              state={{ jumpToDate: goal.deadline }}
              style={{ textDecoration: "underline", color: "blue" }}
            >
              {goal.deadline}
            </Link>
          </td>
          <td>{goal.category}</td>
          <td>${goal.wager}</td>
          <td>
            {goal.completed && goal.proofImage ? (
              <img
                src={goal.proofImage}
                alt="Proof"
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
              />
            ) : goal.completed ? (
              "✔️"
            ) : (
              <button
                className="complete-btn"
                onClick={() => markAsComplete(goal.index)}
              >
                Complete
              </button>
            )}
          </td>
        </tr>
      ));
  };

  return (
    <div className="goals-page">
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2
          style={{
            fontSize: "2rem",
          }}
        >
          Forfeit has helped you save: ${moneySaved}
        </h2>
      </div>
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
          Completed
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
                <th>Wager</th>
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
                <th>Wager</th>
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
