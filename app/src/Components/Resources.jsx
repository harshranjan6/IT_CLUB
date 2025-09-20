import React, { useState } from "react";
import "./Resources.css"; // move your CSS here if you want

// Sample data for notes
const notesData = [
  { topic: "html", title: "HTML Notes", link: "notes/html-basics.pdf" },
  { topic: "css", title: "CSS Notes", link: "notes/css-fundamentals.pdf" },
  { topic: "javascript", title: "JavaScript Notes", link: "notes/javascript-intro.pdf" },
];

// Sample data for videos
const videoData = [
  { title: "HTML Basics", src: "https://www.youtube.com/embed/qz0aGYrrlhU" },
  { title: "CSS Fundamentals", src: "https://www.youtube.com/embed/OEV8gMkCHXQ" },
  { title: "JavaScript Basics", src: "https://www.youtube.com/embed/W6NZfCO5SIk" },
];

// Dropdown component
function Dropdown({ label, value, onChange, options }) {
  return (
    <div className="filter-box">
      <label>{label}</label>
      <select value={value} onChange={onChange}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// Card component
function Card({ title, link, src }) {
  return (
    <div className="card" data-topic={link ? "" : title.toLowerCase()}>
      <h3>{title}</h3>
      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer">
          Download
        </a>
      )}
      {src && <iframe src={src} title={title} allowFullScreen />}
    </div>
  );
}

// Main Component
function Resources() {
  const [syllabusNotes, setSyllabusNotes] = useState("");

  const handleSyllabusChange = (e) => {
    setSyllabusNotes(e.target.value);
  };

  return (
    <div>
      <h1>Important Resources</h1>

      {/* Dropdowns */}
      <div className="filter-container">
        <Dropdown
          label="Choose Topic:"
          value=""
          onChange={() => {}}
          options={[
            { value: "all", label: "All" },
            { value: "html", label: "HTML" },
            { value: "css", label: "CSS" },
            { value: "javascript", label: "JavaScript" },
            { value: "bootstrap", label: "Bootstrap" },
            { value: "node", label: "Node.js" },
            { value: "express", label: "Express.js" },
            { value: "react", label: "React.js" },
            { value: "mysqli", label: "MySQLi" },
            { value: "mongodb", label: "MongoDB" },
          ]}
        />
        <Dropdown
          label="Choose Notes:"
          value=""
          onChange={() => {}}
          options={[
            { value: "all", label: "All" },
            { value: "html", label: "HTML" },
            { value: "css", label: "CSS" },
            { value: "javascript", label: "JavaScript" },
            { value: "bootstrap", label: "Bootstrap" },
            { value: "node", label: "Node.js" },
            { value: "express", label: "Express.js" },
            { value: "react", label: "React.js" },
            { value: "mysqli", label: "MySQLi" },
            { value: "mongodb", label: "MongoDB" },
          ]}
        />
      </div>

      <div className="filter-container">
        <Dropdown
          label="Choose Syllabus:"
          value={syllabusNotes}
          onChange={handleSyllabusChange}
          options={[
            { value: "", label: "Select" },
            { value: "1st", label: "1st" },
            { value: "2nd", label: "2nd" },
            { value: "3rd", label: "3rd" },
            { value: "4th", label: "4th" },
            { value: "5th", label: "5th" },
            { value: "6th", label: "6th" },
          ]}
        />
        <Dropdown
          label="Syllabus Notes:"
          value=""
          onChange={() => {}}
          options={[
            { value: "", label: "Select" },
            { value: "videos", label: "Videos" },
            { value: "notes", label: "Notes" },
          ]}
        />
      </div>

      {/* Notes Section */}
      {syllabusNotes === "notes" && (
        <div className="content">
          {notesData.map((note) => (
            <Card key={note.topic} title={note.title} link={note.link} />
          ))}
        </div>
      )}

      {/* Video Section */}
      {syllabusNotes === "videos" && (
        <div className="content">
          {videoData.map((video, idx) => (
            <Card key={idx} title={video.title} src={video.src} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Resources;
