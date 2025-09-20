import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      {isMobile && (
        <div className="burgermenu" onClick={toggleMenu}>
          <div className="item1"></div>
          <div className="item2"></div>
          <div className="item3"></div>
        </div>
      )}

      {(menuOpen || !isMobile) && (
        <div className={`menu-links ${menuOpen ? "open" : ""}`}>
          {isMobile && <span className="close-btn" onClick={toggleMenu}>X</span>}
          <Link to="/" title="Home"><i className="fas fa-home"></i></Link>
          <Link to="/about" title="About"><i className="fas fa-users"></i></Link>
          <Link to="/projects" title="Projects"><i className="fas fa-folder-open"></i></Link>
          <Link to="/resource" title="Resource"><i className="fas fa-bullhorn"></i></Link>
          <Link to="/events" title="Events"><i className="fas fa-calendar-alt"></i></Link>
          <Link to="/contact" title="Contact"><i className="fas fa-envelope"></i></Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
