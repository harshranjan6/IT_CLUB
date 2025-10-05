import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./HackathonLeaderboard.css"; 

const HackathonLeaderboard = () => {
  const { id } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubmissions = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`http://localhost:6969/api/submissions/hackathon/${id}`);
        if (Array.isArray(res.data)) {
          setSubmissions(res.data);
        } else {
          setSubmissions([]);
          setError("Unexpected response from server");
        }
      } catch (err) {
        console.error("Error fetching leaderboard", err);
        setError("Failed to fetch leaderboard. Try again later.");
        setSubmissions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, [id]);

  if (loading) return <p>Loading leaderboard...</p>;
  if (error) return <p className="leaderboard-error">{error}</p>;
  if (submissions.length === 0) return <p>No submissions yet.</p>;

  // Sort by score descending; unscored submissions go last
  const sortedSubmissions = [...submissions].sort((a, b) => {
    if (a.score === null) return 1;
    if (b.score === null) return -1;
    return b.score - a.score;
  });

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">Leaderboard</h1>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Team</th>
            <th>User</th>
            <th>GitHub Repo</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {sortedSubmissions.map((s, idx) => (
            <tr key={s._id}>
              <td>{idx + 1}</td>
              <td>{s.teamName || "Unnamed Team"}</td>
              <td>{s.userId?.username || "Unknown User"}</td>
              <td>
                {s.repoLink ? (
                  <a href={s.repoLink} target="_blank" rel="noreferrer" className="leaderboard-link">
                    GitHub
                  </a>
                ) : (
                  "N/A"
                )}
              </td>
              <td>{s.score !== null ? s.score : "Pending"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HackathonLeaderboard;
