import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Quiz.css";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [curr, setCurr] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const questionRefs = useRef({});

  useEffect(() => {
    const fetchQuiz = async () => {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");
      let user = null;
      try {
        user = userStr ? JSON.parse(userStr) : null;
      } catch {
        user = null;
      }

      if (!token || !user) {
        navigate("/login", { state: { from: "/quiz" } });
        return;
      }
      if (user.role === "admin") {
        navigate("/admin/dashboard");
        return;
      }

      try {
        const res = await axios.get("http://localhost:6969/quiz", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuestions(res.data);
        if (res.data.length > 0) setCurr(res.data[0]._id);
      } catch (err) {
        console.error("Error fetching questions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [navigate]);

  const handleSidebarClick = (id) => {
    setCurr(id);
    questionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleAnswer = (qId, option) => {
    setAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let scoreCount = 0;
    questions.forEach((q) => {
      if (answers[q._id] === q.correctAnswer) scoreCount++;
    });

    setScore(scoreCount);
    setSubmitted(true);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:6969/quiz/submit",
        { score: scoreCount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Checking login / loading quiz...</p>;

  if (submitted)
    return (
      <div className="quiz-result">
        <h1>🎉 Quiz Completed!</h1>
        <p>
          You scored <strong>{score}</strong> out of <strong>{questions.length}</strong>
        </p>
        <button
          className="btn"
          onClick={() => {
            setAnswers({});
            setSubmitted(false);
            setScore(0);
            if (questions.length > 0) setCurr(questions[0]._id);
          }}
        >
          Restart Quiz
        </button>
      </div>
    );

  return (
    <div className="quiz-container">
      <header className="header">
        <h1>📝 General Knowledge Quiz</h1>
      </header>

      <aside className="quiz-sidebar">
        <h2>📊 Progress</h2>
        <ul>
          {questions.map((q, index) => {
            const isActive = curr === q._id;
            const isAttempted = !!answers[q._id];
            return (
              <li
                key={q._id}
                className={`${isActive ? "active" : ""} ${isAttempted ? "attempted" : "skipped"}`}
                onClick={() => handleSidebarClick(q._id)}
              >
                Question {index + 1}
              </li>
            );
          })}
        </ul>
      </aside>

      <main className="quiz-main">
        <form className="quiz-form" onSubmit={handleSubmit}>
          {questions.map((q, index) => (
            <div key={q._id} ref={(el) => (questionRefs.current[q._id] = el)} className="question">
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
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}

          {questions.length > 0 && (
            <section className="submit-btn">
              <button type="submit" className="btnms">
                Submit Quiz
              </button>
            </section>
          )}
        </form>
      </main>
    </div>
  );
}

export default Quiz;
