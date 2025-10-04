import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const location = useLocation();


  const from = location.state?.from?.pathname || "/events/hackathon";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:6969/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;

      const userRole = res.data.user.role;

      if (userRole === "admin") {
        navigate("/admin/dashboard");
        return;
      }
      if (from) {
        navigate(from, {replace: true}); 
      } else {
        navigate("/quiz"); 
      }
    } catch (err) {
      console.log("Invalid email or password", err);
      alert("❌ Invalid email or password");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <br />
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <br />
      <button type="submit">Login</button>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </form>
  );
}

export default Login;
