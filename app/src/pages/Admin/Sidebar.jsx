import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ closeSidebar }) => {
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Hackathons", path: "/admin/hackathons" },
    { name: "Submissions", path: "/admin/submissions" },
    { name: "Questions", path: "/admin/questions" },
    { name: "Workshops", path: "/admin/workshops", disabled: true },
  ];

  return (
    <div className="main-container">
      <h2 className="heading">Admin Panel</h2>
      <div className="main">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={location.pathname === link.path ? "active" : ""}
            onClick={closeSidebar}
            style={{ pointerEvents: link.disabled ? "none" : "auto", opacity: link.disabled ? 0.5 : 1 }}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
