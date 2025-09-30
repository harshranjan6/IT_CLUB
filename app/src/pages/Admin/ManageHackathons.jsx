import React from "react";
import AdminLayout from "./AdminLayout";
import "./ManageHackathons.css";

const ManageHackathons = () => {
  const hackathons = [
    { id: 1, name: "Hackathon 1", start: "2025-10-01", end: "2025-10-05" },
    { id: 2, name: "Hackathon 2", start: "2025-11-10", end: "2025-11-15" },
  ];

  return (
    <AdminLayout>
      <h1>Manage Hackathons</h1>
      <button className="add-btn">Add New Hackathon</button>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hackathons.map((h) => (
              <tr key={h.id}>
                <td>{h.name}</td>
                <td>{h.start}</td>
                <td>{h.end}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default ManageHackathons;
