import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProjectDetails.css";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
      
        const res = await axios.get(`http://localhost:6969/projects/${id}`);
        setProject(res.data);
      } catch (err) {
        console.error("Error fetching project details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) return <p>Loading project details...</p>;
  if (!project) return <p>Project not found.</p>;

  return (
    <div className="project-details">
      <button className="back-btn" onClick={() => navigate(-1)}>⬅ Back</button>

      <div className="banner">
        <img src={project.image} alt={project.title} />
        <div className="banner-text">
          <h1>{project.title}</h1>
          <p>{project.category} • {project.difficulty}</p>
        </div>
      </div>

      <div className="details-content">
        <h2>About This Project</h2>
        <p>{project.description}</p>

        {project.techStack && project.techStack.length > 0 && (
          <>
            <h3>Tech Stack</h3>
            <ul className="tech-list">
              {project.techStack.map((tech, i) => <li key={i}>{tech}</li>)}
            </ul>
          </>
        )}

        {project.features && project.features.length > 0 && (
          <>
            <h3>Features</h3>
            <ul className="feature-list">
              {project.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          </>
        )}

        <div className="project-links">
          {project.githubLink && (
            <a href={project.githubLink} target="_blank" rel="noreferrer">
              🔗 View on GitHub
            </a>
          )}
          {project.liveDemo && (
            <a href={project.liveDemo} target="_blank" rel="noreferrer">
              🚀 Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
