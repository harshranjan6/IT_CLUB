import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    name: "Harsh Ranjan",
    role: "Chai-Pani lane bala",
    photo: "/images/team-images/harsh image.jpg",
    bio: "Full-stack developer and project lead.",
    linkedin: "https://www.linkedin.com/in/harsh-ranjan-78515a333/"
  },
  {
    name: "Bibham Kumar",
    role: "UI/UX Designer",
    photo: "/images/team-images/bibham image.jpg",
    bio: "Designs beautiful and intuitive interfaces.",
    linkedin: "https://www.linkedin.com/in/bibham-kumar-3557a932a/"
  },
  {
    name: "Vivek Kuamr",
    role: "Project Manager",
    photo: "/images/team-images/vivek image.jpg",
    bio: "Handles server, database, and API logic.",
    linkedin: "https://www.linkedin.com/in/vivek-kumar-223b32334"
  },
  {
    name: "Ananya Ray",
    role: "Fullstack developer",
    photo: "/images/team-images/ananya image.jpg",
    bio: "Builds responsive and dynamic front-end experiences.",
    linkedin: "https://www.linkedin.com/in/ananya-ray-97529a2ab"
  }
];


const About = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    // Animate intro paragraph on scroll
    const intro = document.querySelector(".intro p");
    if (intro) {
      gsap.fromTo(
        intro,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: intro,
            start: "top 85%", // start when top of paragraph is 85% of viewport
            end: "bottom 15%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Animate team cards
    cardsRef.current.forEach((card, index) => {
      const isEven = index % 2 === 0;
      const screenHeight = window.innerHeight;

      gsap.fromTo(
        card,
        { x: isEven ? -150 : 150, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: screenHeight / 800,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Hover animation
      card.addEventListener("mouseenter", () => {
        gsap.to(card, { scale: 1.05, y: -5, duration: 0.3, ease: "power2.out" });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" });
      });
    });
  }, []);

  return (
    <div className="about-page">
      <section className="intro">
        <h1 className="dev">IT CLUB MEMBERS</h1>
        <h1> 𝑯𝒆𝒍𝒍𝒐 👋 </h1>
        <p><b><i>𝗠𝗲𝗲𝘁 𝘁𝗵𝗲 𝗮𝗺𝗮𝘇𝗶𝗻𝗴 𝘁𝗲𝗮𝗺 𝘄𝗵𝗼 𝗺𝗮𝗱𝗲 𝘁𝗵𝗶𝘀 𝗽𝗿𝗼𝗷𝗲𝗰𝘁 𝗽𝗼𝘀𝘀𝗶𝗯𝗹𝗲!. We are a passionate team of developers, designers, and innovators committed to creating impactful digital experiences. Our mission is to transform ideas into functional, user-friendly, and visually appealing applications that solve real-world problems. With expertise across web and mobile development, we focus on quality, creativity, and collaboration. Every project we undertake reflects our dedication, technical skill, and attention to detail. Together, we strive to build solutions that inspire, engage, and empower our users.</i></b></p>
      </section>

     <section className="team-section">
  {team.map((member, index) => {
    const isEven = index % 2 === 0;
    return (
      <a
        key={index}
        href={member.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className={`team-card-link ${isEven ? "left" : "right"}`}
      >
        <div
          className="team-card"
          ref={(el) => (cardsRef.current[index] = el)}
        >
          <div className="card-overlay" />
          <div className="card-image">
            <img src={member.photo} alt={member.name} />
          </div>
          <div className="card-content">
            <h2>{member.name}</h2>
            <h4>{member.role}</h4>
            <p>{member.bio}</p>
          </div>
        </div>
      </a>
    );
  })}
</section>

    </div>
  );
};

export default About;
