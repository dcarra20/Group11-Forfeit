import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();

  return (
    <div className="tab-section">
      <Link to="/" className="tab-link">
        <button className={`nav-button ${pathname === "/" ? "active" : ""}`}>
          Home
        </button>
      </Link>
      <Link to="/calendar" className="tab-link">
        <button
          className={`nav-button ${pathname === "/calendar" ? "active" : ""}`}
        >
          Calendar
        </button>
      </Link>
      <Link to="/goals" className="tab-link">
        <button
          className={`nav-button ${pathname === "/goals" ? "active" : ""}`}
        >
          Goals
        </button>
      </Link>
    </div>
  );
}
