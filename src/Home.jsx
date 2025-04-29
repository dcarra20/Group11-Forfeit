import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [completedGoals, setCompletedGoals] = useState([]);

  useEffect(() => {
    const savedGoals = JSON.parse(localStorage.getItem("goals")) || [];
    const userPosts = savedGoals
      .filter((goal) => goal.completed)
      .map((goal, index) => ({
        id: `user-${index}`,
        name: "You",
        goal: "Completed: " + goal.name,
        date: goal.deadline || "No date set",
      }));
    setCompletedGoals(userPosts);
  }, []);

  let dummyPosts = [
    {
      id: 1,
      name: "Alex J.",
      goal: "Completed: 5 miles before 7AM 🌄",
      date: "2025-04-22",
    },
    {
      id: 2,
      name: "Maria L.",
      goal: "Completed: 30 days of coding challenge 💻",
      date: "2025-04-20",
    },
    {
      id: 3,
      name: "Dev S.",
      goal: "Completed: Meditate every morning for a week 🧘",
      date: "2025-04-18",
    },
  ];
  const combinedPosts = [...completedGoals, ...dummyPosts];

  return (
    <div>
      <div className="home-center">
        <h1 style={{ fontSize: 80 }}>Forfeit</h1>
        <h3>
          Say what and when you are going to do,
          <br />
          and how much money you'll
          <br />
          forfeit if you don't.
        </h3>
        <button id="goal-bttn" onClick={() => navigate("/create")}>
          ➕Set a Goal
        </button>
      </div>
      <div className="social-center">
        <div className="post-feed">
          <h1 style={{ fontSize: 40 }}>See What Others Have Done</h1>
          {combinedPosts.map((post) => (
            <div key={post.id} className="post-card">
              <h3>{post.name}</h3>
              <p>{post.goal}</p>
              <small>{post.date}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
