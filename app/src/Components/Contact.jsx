import React, { useState } from "react";
import axios from "axios";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    email: "",
    mobileNumber: "",
    subject: "",
    message: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, rollNumber, email, mobileNumber, subject, message } = formData;

    if (!name || !email || !subject || !message || !mobileNumber) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:6969/contact", {
        name,
        rollNumber,
        email,
        mobileNumber,
        subject,
        message,
        date: new Date(),
      });

      if (response.status === 201) {
        setFormData({
          name: "",
          rollNumber: "",
          email: "",
          mobileNumber: "",
          subject: "",
          message: "",
        });
        setError("");
        alert("✅ Your complaint has been submitted successfully!");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="contact-page">
      <h1>Submit Your Complaint</h1>
      <p className="intro-text">
        If you have any issues in college—like lack of teachers, lack of labs, or other study-related problems—please fill out the form below and we will address it.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label>Name*</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
        />

        <label>Roll Number</label>
        <input
          type="text"
          name="rollNumber"
          value={formData.rollNumber}
          onChange={handleChange}
          placeholder="Official Roll Number"
        />

        <label>Email*</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
        />

        <label>Mobile Number*</label>
        <input
          type="text"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
          placeholder="Enter Mobile Number"
        />

        <label>Subject*</label>
        <select name="subject" value={formData.subject} onChange={handleChange}>
          <option value="">Select a Subject</option>
          <option value="Lack of Teacher">Lack of Teacher</option>
          <option value="Lack of Lab">Lack of Lab</option>
          <option value="Other">Other</option>
        </select>

        <label>Complaint*</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Describe your issue"
        ></textarea>

        <button type="submit">Submit</button>
      </form>

      {error && <p className="error-msg">{error}</p>}
    </div>
  );
}

export default Contact;
