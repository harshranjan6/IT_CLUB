import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const HackathonList = () => {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/hackathons");
        setHackathons(res.data);
      } catch (err) {
        console.error("Error fetching hackathons", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHackathons();
  }, []);

  if (loading) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Available Hackathons</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {hackathons.map(h => (
          <div key={h._id} className="border rounded-xl p-4 shadow-md bg-white">
            <h2 className="text-xl font-semibold">{h.title}</h2>
            <p className="text-gray-600 mb-2">
              Deadline: {new Date(h.deadline).toLocaleDateString()}
            </p>
            <p className="text-sm mb-4">{h.description}</p>
            <Link
              to={`/events/hackathon/${h._id}`}
              className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HackathonList;
