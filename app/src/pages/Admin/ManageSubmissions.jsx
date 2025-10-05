import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import axios from "axios";
import "./ManageSubmissions.css";

const ManageSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchSubmissions = async () => {
    try {
      const res = await axios.get("http://localhost:6969/api/submissions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubmissions(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch submissions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSubmissions(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:6969/api/submissions/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubmissions(submissions.map(s => s._id === id ? { ...s, status } : s));
      alert(`✅ Submission ${status.toLowerCase()}`);
    } catch (err) {
      console.error(err);
      alert("❌ Error updating submission");
    }
  };

  if (loading) return <AdminLayout><p>Loading...</p></AdminLayout>;
  if (submissions.length === 0) return <AdminLayout><p>No submissions found.</p></AdminLayout>;

  return (
    <AdminLayout>
      <h1>Manage Submissions</h1>
      <table className="table">
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
            <tr key={sub._id}>
              <td>{sub.userId?.username || "Unknown"}</td>
              <td>{sub.hackathonId?.title || "Unknown"}</td>
              <td>{new Date(sub.createdAt).toLocaleDateString()}</td>
              <td>{sub.status || "Pending"}</td>
              <td>
                {sub.status === "Pending" && (
                  <>
                    <button onClick={() => updateStatus(sub._id, "Approved")}>Approve</button>
                    <button onClick={() => updateStatus(sub._id, "Rejected")}>Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
};

export default ManageSubmissions;
