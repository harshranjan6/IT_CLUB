import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./HackathonSubmit.css";

const HackathonSubmit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [repoLink, setRepoLink] = useState("");
  const [demoLink, setDemoLink] = useState("");
  const [teamName, setTeamName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    let user = null;
    try {
      user = userStr ? JSON.parse(userStr) : null;
    } catch {
      user = null;
    }

  useEffect(() => {
    
    if (!token || !user) {
      navigate("/login", { state: { from: `/hackathon/submit/${id}` } });
      return;
    }
    if (user.role === "admin") {
      navigate("/admin/dashboard");
      return;
    }
    setLoading(false);
  }, [id, navigate, token, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:6969/api/submissions",
        {
          hackathonId: id,
          userId: user._id,
          teamName,
          repoLink,
          demoLink,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("✅ Submission successful!");
      setTimeout(() => navigate(`/events/hackathon/${id}/leaderboard`), 1500);
    } catch (err) {
      setMessage("❌ Error submitting project");
      console.error(err);
    }
  };

  if (loading) return <p>Checking login...</p>;

  return (
    <div className="submit-container">
      <h1 className="submit-title">Submit Your Project</h1>
      <form onSubmit={handleSubmit} className="submit-form">
        <input
          type="text"
          placeholder="Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="submit-input"
          required
        />
        <input
          type="url"
          placeholder="GitHub Repo Link"
          value={repoLink}
          onChange={(e) => setRepoLink(e.target.value)}
          className="submit-input"
          required
        />
        <input
          type="url"
          placeholder="Live Demo Link (optional)"
          value={demoLink}
          onChange={(e) => setDemoLink(e.target.value)}
          className="submit-input"
        />
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
      {message && <p className="submit-message">{message}</p>}
    </div>
  );
};

export default HackathonSubmit;
