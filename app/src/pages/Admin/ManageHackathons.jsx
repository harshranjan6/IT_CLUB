import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import "./ManageHackathons.css";

const ManageHackathons = () => {
  const [hackathons, setHackathons] = useState([]);
  const [submissions, setSubmissions] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch all hackathons on mount
  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const res = await fetch("/api/hackathons");
        const data = await res.json();
        setHackathons(data);

        const submissionsData = {};
        for (const hackathon of data) {
          const subRes = await fetch(`/api/submissions/hackathon/${hackathon._id}`);
          const subData = await subRes.json();
          submissionsData[hackathon._id] = subData;
        }
        setSubmissions(submissionsData);

      } catch (err) {
        console.error("Error fetching hackathons or submissions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHackathons();
  }, []);

  // Handle score change for a team
  const handleScoreChange = (hackathonId, teamId, value) => {
    const scoreValue = Math.max(0, Math.min(100, Number(value))); // keep 0-100
    setSubmissions((prev) => ({
      ...prev,
      [hackathonId]: prev[hackathonId].map((team) =>
        team._id === teamId ? { ...team, score: scoreValue } : team
      ),
    }));
  };

  // Save scores for a hackathon
  const handleSaveScores = async (hackathonId) => {
    try {
      setSaving(true);
      const updatedTeams = submissions[hackathonId].map(team => ({
        teamId: team._id,
        score: team.score ?? 0
      }));

      const res = await fetch(`/api/scores/${hackathonId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTeams),
      });

      if (!res.ok) throw new Error("Failed to save scores");
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
      {/* TODO: Link to Add Hackathon form */}
      <button className="add-btn">Add New Hackathon</button>

      {hackathons.map((hackathon) => (
        <div key={hackathon._id} className="hackathon-card">
          <h2>{hackathon.title}</h2>
          <p>Deadline: {new Date(hackathon.deadline).toLocaleDateString()}</p>

          <h3>Submissions</h3>
          {submissions[hackathon._id]?.length === 0 ? (
            <p>No submissions yet.</p>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Team Name</th>
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
                      <td>
                        <a href={team.repoLink} target="_blank" rel="noreferrer">
                          GitHub
                        </a>
                      </td>
                      <td>
                        <input
                          type="number"
                          value={team.score ?? ""}
                          onChange={(e) =>
                            handleScoreChange(hackathon._id, team._id, e.target.value)
                          }
                          placeholder="Enter score"
                          min={0}
                          max={100}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <button
            className="save-scores-btn"
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
