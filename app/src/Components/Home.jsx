import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../index.css";
import "./Home.css";

function Home() {
  const [sticky, setSticky] = useState(false);
  const [showScrollUp, setShowScrollUp] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 20);
      setShowScrollUp(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div style={{ color: "black", backgroundColor: "red" }}>
        {/* Announcement / Navbar Section */}
        {/* <div className={`announcement-bar ${sticky ? "sticky" : ""}`}>
          <marquee
            behavior="scroll"
            direction="left"
            scrollamount="6"
            style={{
              width: "100%",
              // background: "#0d2d8eff",

              padding: "10px ",
              margin: "0",
              fontWeight: "bold",
              fontSize: "1.2rem",
              zIndex: 1000,
            }}
          >
            🔔 Welcome to the CSE IT Club! Check out our latest updates and
            events!
          </marquee>
        </div> */}

        {/* Scroll Up Button */}
        <div
          className={`scroll-up-btn ${showScrollUp ? "show" : ""}`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <i className="fas fa-angle-up"></i>
        </div>

        {/* Hero */}
        <section id="hero">
          <h1> 🚀 Welcome to CSE IT Club!</h1>
          <p id="slogan">
            We are a student-led club where creativity meets technology. From
            coding challenges and hackathons to innovative projects, we provide
            students a platform to learn, collaborate, and grow.
          </p>
        </section>
      </div>
      {/* About */}
      <section id="introduction" className="glass">
        <h2>Introduction</h2>
        <p>
          We are a student-driven club where creativity meets technology. Our
          mission is to bring together minds passionate about coding, design,
          and innovation to create real impact.
        </p>
      </section>

      {/* Events */}
      <section id="vision" className="glass">
        <h2>Vision</h2>
        <p>
          From hackathons and AI challenges to fun coding contests and creative
          design sprints — our events are designed by students, for students.
        </p>
      </section>

      <section id="mission" className="glass">
        <h2>Mission</h2>
        <p>
          From hackathons and AI challenges to fun coding contests and creative
          design sprints — our events are designed by students, for students.
        </p>
      </section>

      {/* Contact */}
      <section id="contact" className="glass">
        <h2>Contact Us</h2>
        <p>
          Email: cseitclub@example.com
          <br />
          Follow us on social media to see students' work & updates!
        </p>
      </section>
    </>
  );
}

export default Home;
