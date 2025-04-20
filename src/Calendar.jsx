import React, { useEffect, useState } from "react";

export default function Calendar() {
  const [goals, setGoals] = useState([]);
  const [weekStart, setWeekStart] = useState(new Date());

  useEffect(() => {
    const storedGoals = JSON.parse(localStorage.getItem("goals")) || [];
    setGoals(storedGoals);

    // Set the start of the current week (Sunday)
    const today = new Date();
    const day = today.getDay(); // 0 = Sun, 6 = Sat
    const diff = today.getDate() - day;
    const start = new Date(today.setDate(diff));
    start.setHours(0, 0, 0, 0);
    setWeekStart(start);
  }, []);

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
        </div>
      );
    }
    return days;
  };

  return (
    <div className="calendar weekly-calendar">
      <div className="calendar-header">
        Week of{" "}
        {weekStart.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </div>
      <div className="calendar-row">{renderWeek()}</div>
    </div>
  );
}
