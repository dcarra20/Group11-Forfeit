import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();

  return (
    <div className="tab-section">
      {/* Left: App Title */}
      <div className="left">
        <h1 className="header-title">Forfeit</h1>
      </div>

      {/* Center: Navigation */}
      <div className="center">
        <div className="nav-tabs">
          <Link to="/">
            <button className={pathname === "/" ? "active" : ""}>Home</button>
          </Link>
          <Link to="/calendar">
            <button className={pathname === "/calendar" ? "active" : ""}>
              Calendar
            </button>
          </Link>
          <Link to="/goals">
            <button className={pathname === "/goals" ? "active" : ""}>
              Goals
            </button>
          </Link>
        </div>
      </div>

      {/* Right: Profile */}
      <div className="right">
        <div className="profile-icon">&#128100;</div>
      </div>
    </div>
  );
}
