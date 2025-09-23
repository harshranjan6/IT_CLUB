import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const HackathonSubmit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [repoLink, setRepoLink] = useState("");
  const [demoLink, setDemoLink] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/submissions", {
        hackathonId: id,
        userId: "STUDENT_ID", // TODO: replace with logged-in user from auth context
        repoLink,
        demoLink
      });
      setMessage("Submission successful!");
      setTimeout(() => navigate(`/events/hackathon/${id}/leaderboard`), 1500);
    } catch (err) {
      setMessage("Error submitting project");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Submit Your Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="url"
          placeholder="GitHub Repo Link"
          value={repoLink}
          onChange={e => setRepoLink(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="url"
          placeholder="Live Demo Link (optional)"
          value={demoLink}
          onChange={e => setDemoLink(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default HackathonSubmit;
