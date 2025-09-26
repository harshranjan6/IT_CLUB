import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./HackathonList.css"; 

const HackathonList = () => {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const res = await axios.get("http://localhost:6969/api/hackathons");
        setHackathons(res.data);
      } catch (err) {
        console.error("Error fetching hackathons", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHackathons();
  }, []);

  if (loading) return <p className="hackathon-loading">Loading...</p>;

  return (
    <div className="hackathon-list-container">
      <h1 className="hackathon-list-title">Available Hackathons</h1>
      <div className="hackathon-grid">
        {hackathons.map(h => (
          <div key={h._id} className="hackathon-card">
            <h2 className="hackathon-card-title ">{h.title}</h2>
            <p className="hackathon-deadline">
              Deadline: {new Date(h.deadline).toLocaleDateString()}
            </p>
            <p className="hackathon-description">{h.description}</p>
            <Link to={`/events/hackathon/${h._id}`} className="hackathon-btn">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HackathonList;
