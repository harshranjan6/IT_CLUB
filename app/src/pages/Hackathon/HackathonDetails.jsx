import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./HackathonDetails.css"; 

const HackathonDetails = () => {
  const { id } = useParams();
  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHackathon = async () => {
      try {
        const res = await axios.get(`http://localhost:6969/api/hackathons/${id}`);
        setHackathon(res.data);
      } catch (err) {
        console.error("Error fetching hackathon details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHackathon();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!hackathon) return <p>Hackathon not found</p>;

  return (
    <div className="hackathon-container">
      <h1 className="hackathon-title">{hackathon.title}</h1>
      <p className="hackathon-deadlines">
        Deadline: {new Date(hackathon.deadline).toLocaleString()}
      </p>
      <p className="hackathon-descriptions">{hackathon.description}</p>

      <div className="hackathon-problem">
        <h2>Problem Statement</h2>
        <p>{hackathon.problemStatement}</p>
      </div>

      <div className="hackathon-action">
        <Link to={`/events/hackathon/${id}/submit`} className="hackathon-btns submit">
          Submit Project
        </Link>
        <Link to={`/events/hackathon/${id}/leaderboard`} className="hackathon-btns leaderboard">
          View Leaderboard
        </Link>
      </div>
    </div>
  );
};

export default HackathonDetails;
