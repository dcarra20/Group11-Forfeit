import React, { useEffect, useState } from "react";

export default function Calendar() {
  const [goals, setGoals] = useState([]);
  const [weekStart, setWeekStart] = useState(getStartOfWeek(new Date()));

  useEffect(() => {
    const storedGoals = JSON.parse(localStorage.getItem("goals")) || [];
    setGoals(storedGoals);
  }, []);

  function getStartOfWeek(date) {
    const day = date.getDay();
    const diff = date.getDate() - day;
    const start = new Date(date.setDate(diff));
    start.setHours(0, 0, 0, 0);
    return start;
  }

  const changeWeek = (direction) => {
    const newStart = new Date(weekStart);
    newStart.setDate(newStart.getDate() + direction * 7);
    setWeekStart(newStart);
  };

  const isSameDay = (date1, date2) =>
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear();

  const isGoalDay = (day) =>
    goals.some((goal) => {
      const goalDate = new Date(goal.deadline);
      return isSameDay(goalDate, day) && !goal.completed;
    });

  const renderWeek = () => {
    const days = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);

      const isToday = isSameDay(day, new Date());
      const isGoal = isGoalDay(day);

      const matchingGoals = goals.filter((goal) => {
        const goalDate = new Date(goal.deadline);
        return isSameDay(goalDate, day) && !goal.completed;
      });

      days.push(
        <div
          key={i}
          className={`calendar-day ${isToday ? "highlight" : ""} ${
            isGoal ? "goal-day" : ""
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
        <button onClick={() => changeWeek(1)}> &rarr;</button>
      </div>
      <div className="calendar-row">{renderWeek()}</div>
    </div>
  );
}
