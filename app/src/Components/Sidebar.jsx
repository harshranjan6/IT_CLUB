import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      <nav className="flex flex-col gap-4">
        <Link to="/admin/dashboard" className="hover:bg-gray-700 p-2 rounded">
          Dashboard
        </Link>
        <Link to="/admin/hackathons" className="hover:bg-gray-700 p-2 rounded">
          Manage Hackathons
        </Link>
        <Link to="/admin/submissions" className="hover:bg-gray-700 p-2 rounded">
          Manage Submissions
        </Link>
        <Link to="/admin/questions" className="hover:bg-gray-700 p-2 rounded">
          Manage Questions
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
