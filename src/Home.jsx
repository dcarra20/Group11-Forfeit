import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-center">
      <h1 style={{ fontSize: 80 }}>Forfeit</h1>
      <h3>
        Say what you're going to do,
        <br />
        when you're going to do it,
        <br />
        and how much money you'll
        <br />
        forfeit if you don't do it.
      </h3>
      <button id="goal-bttn" onClick={() => navigate("/create")}>
        ➕Set a Goal
      </button>
    </div>
  );
}
