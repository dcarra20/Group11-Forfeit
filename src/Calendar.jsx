import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Calendar() {
  const [goals, setGoals] = useState([]);
  const location = useLocation();
  const [weekStart, setWeekStart] = useState(() => {
    const jumpDateStr = location.state?.jumpToDate;
    const jumpDate = jumpDateStr ? new Date(jumpDateStr) : new Date();
    return getStartOfWeek(jumpDate);
  });

  useEffect(() => {
    const storedGoals = JSON.parse(localStorage.getItem("goals")) || [];
    setGoals(storedGoals);
  }, []);

  function getStartOfWeek(date) {
    const copy = new Date(date);
    const day = copy.getDay();
    copy.setDate(copy.getDate() - day);
    copy.setHours(0, 0, 0, 0);
    return copy;
  }

  const changeWeek = (direction) => {
    const newStart = new Date(weekStart);
    newStart.setDate(weekStart.getDate() + direction * 7);
    setWeekStart(getStartOfWeek(newStart));
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const renderWeek = () => {
    const days = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);

      const isToday = isSameDay(day, new Date());

      const matchingGoals = goals.filter((goal) => {
        const [year, month, dayNum] = goal.deadline.split("-").map(Number);
        const goalDate = new Date(year, month - 1, dayNum);
        return isSameDay(goalDate, day);
      });

      const hasActiveGoals = matchingGoals.some((goal) => !goal.completed);
      const hasCompletedGoals = matchingGoals.some((goal) => goal.completed);

      let dayClass = "calendar-day";
      if (isToday) dayClass += " highlight";
      if (hasActiveGoals) dayClass += " goal-day";
      if (hasCompletedGoals) dayClass += " completed-day";

      days.push(
        <div key={i} className={dayClass}>
          <div className="day-name">
            {day.toLocaleDateString("en-US", { weekday: "short" })}
          </div>
          <div className="day-number">{day.getDate()}</div>

          {matchingGoals.length > 0 && (
            <ul style={{ marginTop: "10px", listStyle: "none", padding: 0 }}>
              {matchingGoals.map((goal, idx) => (
                <li
                  key={idx}
                  style={{ fontSize: "0.9rem", marginBottom: "8px" }}
                >
                  <div>
                    {goal.completed ? "" : ""}
                    {goal.name} (${goal.wager})
                  </div>
                  {goal.proofImage && (
                    <img
                      src={goal.proofImage}
                      alt="Proof"
                      style={{
                        marginTop: "5px",
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "5px",
                        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
                      }}
                    />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar weekly-calendar">
      <div className="calendar-header">
        <button onClick={() => changeWeek(-1)}>&larr;</button>
        <span>
          Week of{" "}
          {weekStart.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </span>
        <button onClick={() => changeWeek(1)}>&rarr;</button>
      </div>

      <div
        style={{ textAlign: "center", marginBottom: "10px", fontSize: "1rem" }}
      >
        <span
          style={{
            background: "#ffb347",
            padding: "5px 10px",
            borderRadius: "5px",
            marginRight: "10px",
          }}
        >
          Active
        </span>
        <span
          style={{
            background: "#b2f2bb",
            padding: "5px 10px",
            borderRadius: "5px",
          }}
        >
          Completed
        </span>
      </div>

      <div className="calendar-row">{renderWeek()}</div>
    </div>
  );
}
