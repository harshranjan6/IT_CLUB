import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "./AdminLayout.css";
import { Menu } from "lucide-react";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="layout">
      {/* Hamburger button for mobile */}
      <button
        className="hamburger"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu size={28} color="#00e0ff" />
      </button>

      {/* Sidebar */}
      <div className={`sidebar-wrapper ${isSidebarOpen ? "open" : ""}`}>
        <Sidebar closeSidebar={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="content">{children}</div>
    </div>
  );
};

export default AdminLayout;
