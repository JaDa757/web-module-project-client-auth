import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Login = () => {
    const navigate = useNavigate(); 
    
    const [creds, setCreds] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        setCreds({
            ...creds,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:9000/api/login', creds)
            .then(resp => {
                localStorage.setItem("token", resp.data.token);                
                navigate('/friends'); 
            })
            .catch(err => {
                console.log(err);
            });
    }
    
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='username'>Username</label>
                    <input onChange={handleChange} name="username" id='username' value={creds.username} />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input onChange={handleChange} name="password" type='password' id='password' value={creds.password} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Login;
