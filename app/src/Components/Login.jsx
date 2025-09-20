import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'
import './Login.css'
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const res = await axios.post("http://localhost:6969/login",{
                email,
                password,
            });
            localStorage.setItem("token", res.data.token); // save token in local storage
            axios.defaults.headers.common['Authorization'] =`Bearer ${res.data.token}`; // set default header for future requests

            navigate("/quiz"); // navigate to protected route
        }catch(err){
            console.log("Invalid email or password")
        }
    }
  return (
    <form onSubmit={handleSubmit} className='login-form'>
      <h2>Login</h2>
        <input 
        type="email"
        placeholder='Enter your email'
        value={email}
        onChange={(e) => setEmail(e.target.value)} 
        required
        />
        <br />
        
        <input 
        type="password"
        placeholder='Create Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        />
        <br />
      <button type='submit'>Login</button>
      <p>Don't have an account? <Link to="/register"> Register here</Link></p>
    </form>
  )
}

export default Login
