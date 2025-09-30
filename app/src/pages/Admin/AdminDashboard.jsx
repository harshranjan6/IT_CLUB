import React from "react";
import AdminLayout from "./AdminLayout";
import { BookOpen, FileText, Clipboard, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const sections = [
    { title: "Hackathons", desc: "Manage all hackathons", icon: <Clipboard size={40} color="#00e0ff" />, route: "/admin/hackathons" },
    { title: "Submissions", desc: "Review participant submissions", icon: <FileText size={40} color="#00e0ff" />, route: "/admin/submissions" },
    { title: "Questions", desc: "Manage quiz questions", icon: <BookOpen size={40} color="#00e0ff" />, route: "/admin/questions" },
    { title: "Workshops", desc: "Coming Soon", icon: <Calendar size={40} color="#00e0ff" />, route: "#", disabled: true },
  ];

  return (
    <AdminLayout>
      <div className="admin-dashboard">
        <h1 className="title">Welcome, Admin!</h1>
        <p className="prop">Manage all sections of the platform from here.</p>

        <div className="dashboard-grid">
          {sections.map((section) => (
            <div
              key={section.title}
              className={`dashboard-card ${section.disabled ? "disabled" : ""}`}
              onClick={() => !section.disabled && navigate(section.route)}
            >
              <div className="icon">{section.icon}</div>
              <h2>{section.title}</h2>
              <p>{section.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
