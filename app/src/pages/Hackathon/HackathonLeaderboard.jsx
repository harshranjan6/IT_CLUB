import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const HackathonLeaderboard = () => {
  const { id } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/submissions/hackathon/${id}`);
        setSubmissions(res.data);
      } catch (err) {
        console.error("Error fetching leaderboard", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, [id]);

  if (loading) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Leaderboard</h1>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Rank</th>
            <th className="border px-4 py-2">User</th>
            <th className="border px-4 py-2">Repo</th>
            <th className="border px-4 py-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {submissions
            .sort((a, b) => b.score - a.score)
            .map((s, idx) => (
              <tr key={s._id} className="text-center">
                <td className="border px-4 py-2">{idx + 1}</td>
                <td className="border px-4 py-2">{s.userId?.name || "Student"}</td>
                <td className="border px-4 py-2">
                  <a href={s.repoLink} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                    GitHub
                  </a>
                </td>
                <td className="border px-4 py-2">{s.score ?? "Pending"}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default HackathonLeaderboard;
