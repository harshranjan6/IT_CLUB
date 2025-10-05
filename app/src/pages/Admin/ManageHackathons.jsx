import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import axios from "axios";
import "./ManageHackathons.css";

const ManageHackathons = () => {
  const [hackathons, setHackathons] = useState([]);
  const [submissions, setSubmissions] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const res = await axios.get("http://localhost:6969/api/hackathons", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHackathons(res.data);

        // Fetch submissions for each hackathon
        const subData = {};
        for (const h of res.data) {
          const subRes = await axios.get(`http://localhost:6969/api/submissions/hackathon/${h._id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          subData[h._id] = subRes.data;
        }
        setSubmissions(subData);

      } catch (err) {
        console.error(err);
        alert("Failed to fetch hackathons or submissions");
      } finally {
        setLoading(false);
      }
    };

    fetchHackathons();
  }, [token]);

  const handleScoreChange = (hackathonId, teamId, value) => {
    const scoreValue = Math.max(0, Math.min(100, Number(value)));
    setSubmissions((prev) => ({
      ...prev,
      [hackathonId]: prev[hackathonId].map((team) =>
        team._id === teamId ? { ...team, score: scoreValue } : team
      ),
    }));
  };

  const handleSaveScores = async (hackathonId) => {
    try {
      setSaving(true);
      const updatedScores = submissions[hackathonId].map(team => ({
        teamId: team._id,
        score: team.score ?? 0,
      }));

      await axios.put(`http://localhost:6969/api/scores/${hackathonId}`, updatedScores, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("✅ Scores updated successfully");
    } catch (err) {
      console.error(err);
      alert("❌ Error saving scores");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <AdminLayout><p>Loading hackathons...</p></AdminLayout>;

  return (
    <AdminLayout>
      <h1>Manage Hackathons</h1>

      {hackathons.map((hackathon) => (
        <div key={hackathon._id} className="hackathonic-card">
          <h2>{hackathon.title}</h2>
          <p>Deadline: {new Date(hackathon.deadline).toLocaleDateString()}</p>

          <h3>Submissions</h3>
          {submissions[hackathon._id]?.length === 0 ? (
            <p>No submissions yet.</p>
          ) : (
            <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Team</th>
                  <th>User</th>
                  <th>Repo</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {submissions[hackathon._id].map((team) => (
                  <tr key={team._id}>
                    <td>{team.teamName || "Unnamed Team"}</td>
                    <td>{team.userId?.username || "Unknown User"}</td>
                    <td><a href={team.repoLink} target="_blank" rel="noreferrer">GitHub</a></td>
                    <td>
                      <input
                        type="number"
                        value={team.score ?? ""}
                        min={0} max={100}
                        onChange={(e) => handleScoreChange(hackathon._id, team._id, e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          )}
          <button
            className="save-btn"
            disabled={saving || !submissions[hackathon._id]?.length}
            onClick={() => handleSaveScores(hackathon._id)}
          >
            {saving ? "Saving..." : "Save Scores"}
          </button>
        </div>
      ))}
    </AdminLayout>
  );
};

export default ManageHackathons;
