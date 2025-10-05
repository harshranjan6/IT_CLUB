import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import axios from "axios";
import "./ManageQuestions.css";

const ManageQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [text, setText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch questions from backend
  const fetchQuestions = async () => {
    try {
      const res = await axios.get("http://localhost:6969/api/questions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestions(res.data);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to fetch questions");
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const resetForm = () => {
    setText("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer("");
    setEditingId(null);
    setShowForm(false);
  };

  // Add or Edit question
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { text, options, correctAnswer };

      if (editingId) {
        // Edit existing question
        const res = await axios.put(
          `http://localhost:6969/api/questions/${editingId}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setQuestions(questions.map(q => q._id === editingId ? res.data : q));
        alert("✅ Question updated!");
      } else {
        // Add new question
        const res = await axios.post(
          "http://localhost:6969/api/questions",
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setQuestions([...questions, res.data]);
        alert("✅ Question added!");
      }

      resetForm();
    } catch (err) {
      console.error(err);
      alert("❌ Error saving question");
    }
  };

  // Delete question
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;

    try {
      await axios.delete(`http://localhost:6969/api/questions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestions(questions.filter(q => q._id !== id));
      alert("✅ Question deleted!");
    } catch (err) {
      console.error(err);
      alert("❌ Error deleting question");
    }
  };

  // Start editing a question
  const handleEdit = (question) => {
    setEditingId(question._id);
    setText(question.text);
    setOptions(question.options || ["", "", "", ""]);
    setCorrectAnswer(question.correctAnswer || "");
    setShowForm(true);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <AdminLayout>
      <h1>Manage Questions</h1>

      <button className="add-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close Form" : "Add New Question"}
      </button>

      {(showForm || editingId) && (
        <form className="question-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Question Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          {options.map((opt, i) => (
            <input
              key={i}
              type="text"
              placeholder={`Option ${i + 1}`}
              value={opt}
              onChange={(e) => handleOptionChange(i, e.target.value)}
              required
            />
          ))}
          <input
            type="text"
            placeholder="Correct Answer"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            required
          />
          <button type="submit">{editingId ? "Save Changes" : "Add Question"}</button>
        </form>
      )}

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Question</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q) => (
              <tr key={q._id}>
                <td>{q.text}</td>
                <td>{q.options?.length ? "MCQ" : "Descriptive"}</td>
                <td>
                  <button onClick={() => handleEdit(q)}>Edit</button>
                  <button onClick={() => handleDelete(q._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default ManageQuestions;
