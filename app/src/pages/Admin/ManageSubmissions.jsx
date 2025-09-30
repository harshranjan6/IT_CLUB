import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import axios from "axios";
import "./ManageSubmissions.css";

const ManageSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch submissions from backend
  const fetchSubmissions = async () => {
    if (!token) return;
    try {
      const res = await axios.get("http://localhost:6969/get-submissions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubmissions(res.data);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to fetch submissions");
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  // Approve submission
  const handleApprove = async (id) => {
    if (!token) return;
    try {
      await axios.put(`http://localhost:6969/submissions/${id}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubmissions(submissions.map(s => s.id === id ? {...s, status: "Approved"} : s));
      alert("✅ Submission approved");
    } catch (err) {
      alert("❌ Error: " + err.message);
    }
  };

  // Reject submission
  const handleReject = async (id) => {
    if (!token) return;
    try {
      await axios.put(`http://localhost:6969/submissions/${id}/reject`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubmissions(submissions.map(s => s.id === id ? {...s, status: "Rejected"} : s));
      alert("❌ Submission rejected");
    } catch (err) {
      alert("❌ Error: " + err.message);
    }
  };

  return (
    <AdminLayout>
      <h1>Manage Submissions</h1>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Hackathon</th>
              <th>Submitted On</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map(sub => (
              <tr key={sub.id}>
                <td>{sub.userName}</td>
                <td>{sub.hackathonName}</td>
                <td>{new Date(sub.date).toLocaleDateString()}</td>
                <td>{sub.status}</td>
                <td>
                  {sub.status === "Pending" && (
                    <>
                      <button onClick={() => handleApprove(sub.id)}>Approve</button>
                      <button onClick={() => handleReject(sub.id)}>Reject</button>
                    </>
                  )}
                  <button>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default ManageSubmissions;
