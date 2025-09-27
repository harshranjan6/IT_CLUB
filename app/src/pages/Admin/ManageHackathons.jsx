import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import axios from "axios";

const ManageHackathons = () => {
  const [hackathons, setHackathons] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:6969/api/hackathons")
      .then(res => setHackathons(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Manage Hackathons</h1>
      <ul>
        {hackathons.map(h => (
          <li key={h._id} className="border p-2 mb-2 rounded bg-white">
            {h.title}
          </li>
        ))}
      </ul>
    </AdminLayout>
  );
};

export default ManageHackathons;
