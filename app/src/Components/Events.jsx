import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import "./LoginForm.jsx";
import "./Events.css"; // move your CSS here
import box3 from "../assets/box3.jpg";
import box4 from "../assets/box4.jpg";
import box5 from "../assets/box5.jpg";
import box6 from "../assets/box6.jpg";



const Events = () => {
  const navigate = useNavigate();
  const Hackthon = () => {
    navigate("/resource")
  }
  const gotoquiz =() =>{
    navigate("/quiz");
  }
 

  const [counter, setCounter] = useState(0);

  const images = [
    { src: box3, alt: "Hackathon" },
    { src: box4, alt: "Web3 Workshop" },
    { src: box5, alt: "AI Challenge" },
    { src: box6, alt: "Students" },
  ];

  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => {
    setCounter((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCounter((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div>
      
      {/* Marquee */}
      <marquee behavior="scroll" direction="left" scrollamount="6">
        🔔 Upcoming Events: Hackathon 15th Sept | Web3 Workshop 22nd Sept | AI Challenge 30th Sept
      </marquee>

     

      {/* Carousel */}
      <div className="carousel-container">
        <div
          className="carousel-slide"
          style={{ transform: `translateX(-${counter * 100}%)`, display: "flex", transition: "0.5s ease" }}
        >
          {images.map((img, index) => (
            <img key={index} src={img.src} alt={img.alt} />
          ))}
        </div>
        <div className="prev" onClick={prevSlide}>
          &#10094;
        </div>
        <div className="next" onClick={nextSlide}>
          &#10095;
        </div>
      </div>

      {/* Event Cards */}
      <div className="events-section">
        <div className="event-card">
          <h3>Quiz</h3>
          <p>Test your knowledge and win exciting prizes!</p>
        
          <button className="btn-3d" onClick={gotoquiz}>Quiz</button>
   
        </div>
        <div className="event-card">
          <h3>Hackathon</h3>
          <p>Collaborate, code, and create innovative projects.</p>
          <button className="btn-3d" onClick={Hackthon}>Join Hackathon</button>
        </div>
        <div className="event-card">
          <h3>Workshop</h3>
          <p>Learn new skills in Web3, AI, and more!</p>
          <button className="btn-3d">Attend Workshop</button>
        </div>
      </div>
      
    </div>
  );
};

export default Events;
