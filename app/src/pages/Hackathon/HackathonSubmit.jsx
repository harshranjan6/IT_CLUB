import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./HackathonSubmit.css"; 

const HackathonSubmit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [repoLink, setRepoLink] = useState("");
  const [demoLink, setDemoLink] = useState("");
  const [teamName, setTeamName] = useState(""); // added team name
  const [message, setMessage] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    try {
        const token = localStorage.getItem("token"); // get tokem from login
        if(!token){
          setMessage("You must be logged in to submit.");
          return;
        }

      await axios.post("http://localhost:6969/api/submissions", {
        hackathonId: id,
        userId: "STUDENT_ID", // TODO: replace with logged-in user from auth context
        repoLink,
        demoLink,
      },
      {
        headers:{Authorization:`Bearer ${token}`} // send token
      } 
    );
    
      setMessage("✅ Submission successful!");
      setTimeout(() => navigate(`/events/hackathon/${id}/leaderboard`), 1500);
    } catch (err) {
      setMessage("❌ Error submitting project");
    }
  };

  return (
    <div className="submit-container">
      <h1 className="submit-title">Submit Your Project</h1>
      <form onSubmit={handleSubmit} className="submit-form">
        <input
          type="text"
          placeholder="Team Name"
          value={teamName}
          onChange={e => setTeamName(e.target.value)}
          className="submit-input"
          required
        />
        <input
          type="url"
          placeholder="GitHub Repo Link"
          value={repoLink}
          onChange={e => setRepoLink(e.target.value)}
          className="submit-input"
          required
        />
        <input
          type="url"
          placeholder="Live Demo Link (optional)"
          value={demoLink}
          onChange={e => setDemoLink(e.target.value)}
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
