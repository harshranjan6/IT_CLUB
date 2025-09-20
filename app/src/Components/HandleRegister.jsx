import React, {useState} from 'react';
import './Register.css';

function HandleRegister() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMesssage] = useState("") ;

    const HandleRegister = async (e) =>{
        e.preventDefault(); // prevent from reloading the page
        try{
            const res = await fetch("http://localhost:6969/register",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, email, password}),
            });
            const data = await res.json();
            if(res.ok){
                // save token in localStorage
                localStorage.setItem("token", data.token);
                setMesssage(data.message || "Registration successful");
                // Optionally redirect to login or quiz page
            }else{
                setMesssage(data.message || "Registration failed")
            }
        }catch(err){
            setMesssage("An error occurred. Please try again")
        }
    }

  return (
    <div>
      
      <form onSubmit={HandleRegister} className='register-form'>
        <h2>Registration Form</h2>
        <input
          type="text"
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required>
        </input>
        <br />
        <input 
        type='email'
        placeholder='Enter your email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required>
        </input>
        <br />
        <input 
        type='password'
        placeholder='Enter your password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required>
        </input>
        <br />
        <button type='submit'>Register</button>

      </form>
        <p>{message}</p>

    </div>
  )
}

export default HandleRegister
