import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GoalForm() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState("");
  const [wager, setWager] = useState(1);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newGoal = { name, category, deadline, wager, completed: false };
    const goals = JSON.parse(localStorage.getItem("goals")) || [];
    goals.push(newGoal);
    localStorage.setItem("goals", JSON.stringify(goals));
    navigate("/goals");
  };

  return (
    <div className="goal-form-container">
      <div className="goal-form-box">
        <div className="goal-form-header">
          <button className="back-btn" onClick={() => navigate("/")}>
            &#8592;
          </button>
          <h1>Forfeit</h1>
          <div className="profile-icon">&#128100;</div>
        </div>

        <form className="create-goal-form" onSubmit={handleSubmit}>
          <label htmlFor="goalName">Goal Name:</label>
          <input
            type="text"
            id="goalName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="goalCategory">Category:</label>
          <select
            id="goalCategory"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a Category</option>
            <option value="Physical">Physical</option>
            <option value="Educational">Educational</option>
            <option value="Hobby">Hobby</option>
            <option value="Work">Work</option>
          </select>

          <label htmlFor="goalDeadline">Deadline:</label>
          <input
            type="date"
            id="goalDeadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />

          <label htmlFor="goalWager">Wager:</label>
          <div className="wager-input">
            <span>$</span>
            <input
              type="number"
              id="goalWager"
              min="1"
              value={wager}
              onChange={(e) => setWager(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="create-btn">
            ➕ Create
          </button>
        </form>
      </div>
    </div>
  );
}
