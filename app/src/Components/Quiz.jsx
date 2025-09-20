import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Quiz.css";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [curr, setCurr] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const questionRefs = useRef({});

  // Fetch questions from backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("❌ You must be logged in to take the quiz");
          window.location.href = "/login";
          return;
        }

        const res = await axios.get("http://localhost:6969/quiz", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Fetched questions:", res.data);
        setQuestions(res.data);
        if (res.data.length > 0) setCurr(res.data[0]._id);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          alert("⚠️ Session expired. Please log in again.");
          localStorage.removeItem("token");
          window.location.href = "/login";
        } else {
          console.error("Error fetching questions:", err.message);
        }
      }
    };

    fetchQuestions();
  }, []);

  const handleSidebarClick = (id) => {
    setCurr(id);
    questionRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleAnswer = (qId, option) => {
    setAnswers({ ...answers, [qId]: option });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let scoreCount = 0;

    questions.forEach((q) => {
      if (answers[q._id] === q.correctAnswer) {
        scoreCount++;
      }
    });

    setScore(scoreCount);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="quiz-result">
        <h1>🎉 Quiz Completed!</h1>
        <p>
          You scored <strong>{score}</strong> out of{" "}
          <strong>{questions.length}</strong>
        </p>
        <button
          className="btn"
          onClick={() => {
            setAnswers({});
            setSubmitted(false);
            setScore(0);
            if (questions.length > 0) {
              setCurr(questions[0]._id);
            }
          }}
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <header className="header">
        <h1>📝 General Knowledge Quiz</h1>
        <p className="subtitle">Choose the correct option from each question.</p>
      </header>

      {/* Sidebar */}
      <aside className="quiz-sidebar">
        <h2>📊 Progress</h2>
        <ul>
          {questions.map((q, index) => {
            const isActive = curr === q._id;
            const isAttempted = !!answers[q._id];

            return (
              <li
                key={q._id}
                className={`${isActive ? "active" : ""} ${
                  isAttempted ? "attempted" : "skipped"
                }`}
                onClick={() => handleSidebarClick(q._id)}
              >
                Question {index + 1}
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Main quiz body */}
      <main className="quiz-main">
        <form className="quiz-form" onSubmit={handleSubmit}>
          {questions.map((q, index) => (
            <div
              key={q._id}
              className="question"
              ref={(el) => (questionRefs.current[q._id] = el)}
            >
              <label>
                <strong>
                  {index + 1}. {q.text}
                </strong>
              </label>
              <div className="options">
                {q.options.map((option, i) => (
                  <label key={i}>
                    <input
                      type="radio"
                      name={`q${q._id}`}
                      value={option}
                      checked={answers[q._id] === option}
                      onChange={() => handleAnswer(q._id, option)}
                      required={!answers[q._id]} // required until one is picked
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}

          {/* Submit button */}
          {questions.length > 0 && (
            <section className="submit-btn">
              <button type="submit" className="btn">
                Submit
              </button>
            </section>
          )}
        </form>
      </main>
    </div>
  );
}

export default Quiz;
