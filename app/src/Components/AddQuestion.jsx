import React, { useState } from "react";
import axios from "axios";
import "./AddQuestion.css";
function AddQuestion() {
  const [text, setText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if(!token){
      alert("❌ You must be logged in to add a question")
      return;
    }
    try {
      await axios.post("http://localhost:6969/add-question", {
        text,
        options,
        correctAnswer,
      },
      {headers: {
        Authorization: `Bearer ${token}`
      },
    }
    );
      alert("✅ Question added!");
      setText("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer("");
    } catch (err) {
      alert("❌ Error: " + err.message);
    }
  };

  return (
    <div className="add-question-container">
      <h2>Add New Question</h2>
      <form onSubmit={handleSubmit} className="add-question-form">
        <input
          type="text"
          placeholder="Enter question text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <br />

        {options.map((opt, i) => (
          <input
            key={i}
            type="text"
            placeholder={`Option ${i + 1}`}
            value={opt}
            onChange={(e) => handleOptionChange(i, e.target.value)}
            required
            style={{ width: "100%", marginBottom: "10px" }}
          />
        ))}
          <br />
        <input
          type="text"
          placeholder="Correct Answer"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <br />

        <button type="submit">Add Question</button>
      </form>
    </div>
  );
}

export default AddQuestion;
