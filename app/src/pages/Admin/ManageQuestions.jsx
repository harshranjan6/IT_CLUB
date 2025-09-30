import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import axios from "axios";
import "./ManageQuestions.css";

const ManageQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [text, setText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch questions from backend
  const fetchQuestions = async () => {
    if(!token) return;
    try {
      const res = await axios.get("http://localhost:6969/get-questions", {
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

  // Add new question
  const handleAddQuestion = async (e) => {
    e.preventDefault();
    if(!token){
      alert("❌ You must be logged in");
      return;
    }
    try {
      const res = await axios.post("http://localhost:6969/add-question", {
        text, options, correctAnswer
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setQuestions([...questions, res.data]);
      setText("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer("");
      setShowAddForm(false);
      alert("✅ Question added!");
    } catch (err) {
      alert("❌ Error: " + err.message);
    }
  };

  // Delete question
  const handleDelete = async (id) => {
    if(!token) return;
    if(!window.confirm("Are you sure you want to delete this question?")) return;
    try {
      await axios.delete(`http://localhost:6969/delete-question/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setQuestions(questions.filter(q => q.id !== id));
      alert("✅ Question deleted");
    } catch (err) {
      alert("❌ Error: " + err.message);
    }
  };

  // Start editing
  const handleEdit = (question) => {
    setEditingId(question.id);
    setText(question.text);
    setOptions(question.options || ["", "", "", ""]);
    setCorrectAnswer(question.correctAnswer || "");
  };

  // Save edited question
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if(!token) return;
    try {
      const res = await axios.put(`http://localhost:6969/edit-question/${editingId}`, {
        text, options, correctAnswer
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setQuestions(questions.map(q => q.id === editingId ? res.data : q));
      setEditingId(null);
      setText("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer("");
      alert("✅ Question updated!");
    } catch (err) {
      alert("❌ Error: " + err.message);
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <AdminLayout>
      <h1>Manage Questions</h1>
      <button className="add-btn" onClick={() => setShowAddForm(!showAddForm)}>
        {showAddForm ? "Close Form" : "Add New Question"}
      </button>

      {/* Add/Edit Form */}
      {showAddForm || editingId ? (
        <form className="add-question-form" onSubmit={editingId ? handleSaveEdit : handleAddQuestion}>
          <input
            type="text"
            placeholder="Enter question text"
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
      ) : null}

      {/* Questions Table */}
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
              <tr key={q.id}>
                <td>{q.text}</td>
                <td>{q.options && q.options.length ? "MCQ" : "Descriptive"}</td>
                <td>
                  <button onClick={() => handleEdit(q)}>Edit</button>
                  <button onClick={() => handleDelete(q.id)}>Delete</button>
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
