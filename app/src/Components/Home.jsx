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
        <p className="intro-text">
  Welcome to the <b>IT Club!</b>, where creativity meets technology! We’re a
  student-driven community dedicated to empowering future innovators through
  hands-on experiences and collaboration. From thrilling <b>hackathons</b> and
  brain-teasing <b>tech quizzes</b> to fun learning events, we make tech both
  educational and exciting. Have a problem in college—like lack of teachers or
  labs? Submit it through our <b>contact section</b> and let’s find solutions
  together. Explore our growing list of <b>projects</b> to build your skills and
  showcase your ideas. Plus, dive into our <b>resources section</b>, packed with
  everything you need to become a confident and capable <b>coder</b>. 🚀
</p>

      </section>

      {/* Events */}
      <section id="vision" className="glass">
        <h2>Vision</h2>
        <p className="intro-text">
          Our vision is to create an engaging, student-driven community
          where learning meets fun. From hackathons and AI challenges to
          coding contests and creative design sprints, every event is
          designed by students, for students. We aim to inspire innovation,
          teamwork, and problem-solving, giving every member opportunities to 
          build skills, showcase talent, and bring bold ideas to life.
        </p>
      </section>

      <section id="mission" className="glass">
        <h2>Mission</h2>
        <p className="intro-text">
          Our mission is to empower students through hands-on learning 
          and innovation. From hackathons and AI challenges to coding 
          contests and design sprints, every event is created by students,
          for students, to inspire creativity, collaboration, and skill-building.
        </p>
      </section>

      {/* Contact */}
      <section id="contact" className="glass">
        <h2>Contact Us</h2>
        <p className="intro-text">
          Email: cseitclub@example.com
          <br />
          Follow us on social media to see students' work & updates!
        </p>
      </section>
    </>
  );
}

export default Home;
