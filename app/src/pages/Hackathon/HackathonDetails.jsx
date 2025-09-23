import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const HackathonDetails = () => {
  const { id } = useParams();
  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHackathon = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/hackathons/${id}`);
        setHackathon(res.data);
      } catch (err) {
        console.error("Error fetching hackathon details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHackathon();
  }, [id]);

  if (loading) return <p className="text-center mt-6">Loading...</p>;
  if (!hackathon) return <p className="text-center mt-6">Hackathon not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{hackathon.title}</h1>
      <p className="text-gray-600 mb-2">
        Deadline: {new Date(hackathon.deadline).toLocaleString()}
      </p>
      <p className="text-lg mb-4">{hackathon.description}</p>

      <div className="bg-gray-100 p-4 rounded-xl mb-6">
        <h2 className="text-xl font-semibold mb-2">Problem Statement</h2>
        <p>{hackathon.problemStatement}</p>
      </div>

      <div className="flex gap-4">
        <Link
          to={`/events/hackathon/${id}/submit`}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Submit Project
        </Link>
        <Link
          to={`/events/hackathon/${id}/leaderboard`}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          View Leaderboard
        </Link>
      </div>
    </div>
  );
};

export default HackathonDetails;
