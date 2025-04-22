import React, { useEffect, useState } from "react";

export default function Calendar() {
  const [goals, setGoals] = useState([]);
  const [weekStart, setWeekStart] = useState(getStartOfWeek(new Date()));

  useEffect(() => {
    const storedGoals = JSON.parse(localStorage.getItem("goals")) || [];
    setGoals(storedGoals);
  }, []);

  function getStartOfWeek(date) {
    const copy = new Date(date);
    const day = copy.getDay(); // Sunday = 0
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
        // Parse date safely in local time to avoid timezone offset
        const [year, month, dayNum] = goal.deadline.split("-").map(Number);
        const goalDate = new Date(year, month - 1, dayNum);
        return isSameDay(goalDate, day) && !goal.completed;
      });

      days.push(
        <div
          key={i}
          className={`calendar-day ${isToday ? "highlight" : ""} ${
            matchingGoals.length > 0 ? "goal-day" : ""
          }`}
        >
          <div className="day-name">
            {day.toLocaleDateString("en-US", { weekday: "short" })}
          </div>
          <div className="day-number">{day.getDate()}</div>

          {matchingGoals.length > 0 && (
            <ul style={{ marginTop: "10px", listStyle: "none", padding: 0 }}>
              {matchingGoals.map((goal, idx) => (
                <li key={idx} style={{ fontSize: "0.9rem" }}>
                  {goal.name}
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
      <div className="calendar-row">{renderWeek()}</div>
    </div>
  );
}
