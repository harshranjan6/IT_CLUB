import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Projects.css";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("http://localhost:6969/projects");
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching projects", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <p>Loading projects...</p>;

  const handleProjectClick = (id) => {
    navigate(`/projects/${id}`);
  };

  return (
    <div>
      <h1>PROJECTS</h1>
      <div className="project-grid">
        {projects.map((proj) => {
           
          return (
            <div
              key={proj._id}
              className="project-card"
              style={{ backgroundImage: `url(${proj.image})` }}
              onClick={() => handleProjectClick(proj._id)}
            >
              <div className="project-overlay">
                <h3>{proj.title}</h3>
                <p>{proj.description}</p>
                <div className="project-tags">
                  <span>{proj.category}</span>
                  <span>{proj.difficulty}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Project;
