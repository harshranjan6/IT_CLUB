import React from "react";
import AdminLayout from "./AdminLayout";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold">Welcome, Admin!</h1>
      <p className="mt-4">Use the sidebar to manage hackathons, submissions, and questions.</p>
    </AdminLayout>
  );
};

export default AdminDashboard;
