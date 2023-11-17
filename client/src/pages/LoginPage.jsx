import React from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

export default function LoginPage () {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    
    
    return (
        <div className="login-page">
            <h1>Profile</h1>
            <form>
                <label htmlFor="username">Username</label>
                    <input type="text" name="username" placeholder="Username" required/>
                <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="Password" required/>
                <button type="submit">Connexion</button>
            </form>
            <button><Link to="/register">Register</Link></button>
        </div>
    )
}