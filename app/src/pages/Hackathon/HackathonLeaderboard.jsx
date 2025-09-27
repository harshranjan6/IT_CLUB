import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./HackathonLeaderboard.css"; 

const HackathonLeaderboard = () => {
  const { id } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await axios.get(`http://localhost:6969/api/submissions/hackathon/${id}`);
        setSubmissions(res.data);
      } catch (err) {
        console.error("Error fetching leaderboard", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">Leaderboard</h1>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Repo</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {submissions
            .sort((a, b) => b.score - a.score)
            .map((s, idx) => (
              <tr key={s._id}>
                <td>{idx + 1}</td>
                <td>{s.userId?.username || "Unknown"}</td>
                <td>
                  <a href={s.repoLink} target="_blank" rel="noreferrer" className="leaderboard-link">
                    GitHub
                  </a>
                </td>
                <td>{s.score ?? "Pending"}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default HackathonLeaderboard;
