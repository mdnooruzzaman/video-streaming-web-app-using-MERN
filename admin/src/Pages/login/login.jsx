import React, { useContext } from 'react'
import { useState } from 'react';
import {Link , useNavigate} from 'react-router-dom'
import { login } from '../../context/authContext/apiCalls';
import { AuthContext } from '../../context/authContext/AuthContext';
import './login.scss'

const Login = () => {
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const {isFetching , dispatch} = useContext(AuthContext);
    // const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault();
        //apiCalls
        login({email , password}, dispatch);
       
       
    }
    return (
        <div className='login'>
            <form  className="loginForm">
                <h4 className='loginHeader'>Sign In</h4>
                <input type="text" placeholder='email' className="loginInput" onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder='password' className="loginInput" onChange={(e) => setPassword(e.target.value)} />
                
                     <button className="loginButton" onClick={handleLogin} disabled={isFetching}>Login</button>
               

            </form>
        </div>
    )
}

export default Login
